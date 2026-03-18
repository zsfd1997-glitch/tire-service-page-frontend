import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";
import {
  MOCK_RECORDS,
  MOCK_VEHICLES,
  type TireRecord as TireRecordItem,
} from "../data/mock";

const TIRE_COUNT_OPTIONS = [1, 2, 3, 4];
const ITEM_HEIGHT = 44;
const YEARS = Array.from({ length: 6 }, (_, index) => 2023 + index);
const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);
const MILEAGE_WAN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MILEAGE_QIAN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function formatRecordMonth(value: string) {
  if (!value) return "请选择更换时间";
  const [year, month] = value.split("-");
  return `${year}年${month}月`;
}

function WheelColumn({
  label,
  options,
  value,
  onChange,
  suffix = "",
}: {
  label: string;
  options: number[];
  value: number;
  onChange: (next: number) => void;
  suffix?: string;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const index = options.indexOf(value);
    if (index < 0 || !listRef.current) return;

    listRef.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: "auto",
    });
  }, [options, value]);

  const handleScroll = () => {
    if (!listRef.current) return;
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      if (!listRef.current) return;
      const index = Math.round(listRef.current.scrollTop / ITEM_HEIGHT);
      const next = options[Math.max(0, Math.min(options.length - 1, index))];
      onChange(next);
      listRef.current.scrollTo({
        top: options.indexOf(next) * ITEM_HEIGHT,
        behavior: "smooth",
      });
    }, 90);
  };

  return (
    <div className="flex-1">
      <p className="mb-3 text-center text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
        {label}
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[44px] -translate-y-1/2 rounded-2xl bg-gray-50 shadow-[inset_0_0_0_1px_rgba(229,231,235,0.95)]" />
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="relative z-10 h-[212px] overflow-y-auto scroll-smooth overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingTop: "84px", paddingBottom: "84px", scrollSnapType: "y mandatory" }}
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <div
                key={option}
                className={`relative flex h-[44px] items-center justify-center transition-all ${
                  selected ? "text-gray-900" : "text-gray-300"
                }`}
                style={{
                  fontSize: selected ? "0.9375rem" : "0.875rem",
                  fontWeight: selected ? 700 : 500,
                  scrollSnapAlign: "center",
                }}
              >
                {option}
                {suffix}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TireRecord() {
  const location = useLocation();
  const vehicleId =
    (location.state as { vehicleId?: string } | null)?.vehicleId ?? MOCK_VEHICLES[0].vehicleId;

  const vehicle = useMemo(
    () => MOCK_VEHICLES.find((item) => item.vehicleId === vehicleId) ?? MOCK_VEHICLES[0],
    [vehicleId]
  );
  const [records, setRecords] = useState<TireRecordItem[]>(
    MOCK_RECORDS.filter((item) => item.vehicleId === vehicle.vehicleId)
  );

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [mileageWan, setMileageWan] = useState(3);
  const [mileageQian, setMileageQian] = useState(0);
  const [formCount, setFormCount] = useState(2);
  const [activeSheet, setActiveSheet] = useState<"date" | "mileage" | null>(null);

  const formDate = `${selectedYear}-${String(selectedMonth).padStart(2, "0")}`;
  const mileageValue = mileageWan * 10000 + mileageQian * 1000;
  const formComplete = Boolean(formDate && mileageValue);

  const handleSubmit = () => {
    if (!formComplete) return;

    const newRecord: TireRecordItem = {
      id: `record_${Date.now()}`,
      vehicleId: vehicle.vehicleId,
      date: formDate,
      mileage: mileageValue,
      count: formCount,
      type: "REPLACE",
      createdAt: new Date().toISOString(),
    };

    setRecords([newRecord, ...records]);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] pb-24">
      <Header title="服务" showBack />

      <div className="mx-auto max-w-md space-y-4 px-4 pt-3">
        <div className="border-b border-gray-200 pb-2 text-gray-500" style={{ fontSize: "0.75rem", lineHeight: 1.6 }}>
          <p>*该功能仅用于记录车辆在非比亚迪官方授权服务店的轮胎更换信息，便于您随时查阅</p>
          <p>*该记录数据仅用于后续轮胎提醒周期的优化</p>
        </div>

        <div>
          <h2 className="text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>
            添加换胎记录
          </h2>
        </div>

        <div className="rounded-[28px] border border-gray-200 bg-white px-5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                换胎时间
              </p>
              <button
                onClick={() => setActiveSheet("date")}
                className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-gray-400"
              >
                <span style={{ fontSize: "0.875rem" }}>{formatRecordMonth(formDate)}</span>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              </button>
            </div>

            <div>
              <p className="mb-2 text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                换胎里程
              </p>
              <button
                onClick={() => setActiveSheet("mileage")}
                className="flex w-full items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-gray-400"
              >
                <span style={{ fontSize: "0.875rem" }}>{mileageValue}</span>
                <ChevronRight className="h-4 w-4 flex-shrink-0" />
              </button>
            </div>

            <div>
              <p className="mb-2 text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                换胎数量
              </p>
              <div className="grid grid-cols-4 gap-3">
                {TIRE_COUNT_OPTIONS.map((count) => {
                  const selected = count === formCount;
                  return (
                    <button
                      key={count}
                      onClick={() => setFormCount(count)}
                      className={`rounded-xl py-2.5 transition-all ${
                        selected ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                      style={{ fontSize: "0.875rem", fontWeight: 600 }}
                    >
                      {count}条
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>
            历史换胎记录
          </h3>
          <button className="bg-gray-50 px-3 py-2 text-gray-700" style={{ fontSize: "0.8125rem" }}>
            查看更多 &gt;
          </button>
        </div>

        <div className="space-y-8">
          {records.map((record) => (
            <div
              key={record.id}
              className="rounded-[24px] bg-[#f3f4f6] px-5 py-5 text-gray-800 shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div style={{ fontSize: "0.875rem", lineHeight: 2.4 }}>
                  <p>
                    换胎时间：{new Date(record.date).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "numeric",
                    })}
                  </p>
                  <p>换胎里程：{(record.mileage / 10000).toFixed(1)}万公里</p>
                  <p>换胎数量：{record.count}条</p>
                </div>
                <button
                  onClick={() => setRecords(records.filter((item) => item.id !== record.id))}
                  className="text-red-500"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 px-4">
        <div className="mx-auto max-w-md">
          <button
            onClick={handleSubmit}
            disabled={!formComplete}
            className="w-full rounded-[22px] py-3 text-white transition-colors"
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              backgroundColor: formComplete ? "#171d2b" : "#d9d9d9",
            }}
          >
            保存
          </button>
        </div>
      </div>

      {activeSheet && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px]">
          <button
            className="absolute inset-0"
            aria-label="关闭换胎记录选择"
            onClick={() => setActiveSheet(null)}
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-[calc(100%-2rem)] max-w-[26rem] rounded-t-[28px] bg-white px-4 pb-6 pt-3 shadow-[0_-18px_40px_rgba(15,23,42,0.18)]">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />

            {activeSheet === "date" ? (
              <>
                <div className="mb-4 text-center">
                  <p className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                    换胎时间
                  </p>
                  <p className="mt-1 text-gray-400" style={{ fontSize: "0.75rem" }}>
                    {formatRecordMonth(formDate)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <WheelColumn label="年份" options={YEARS} value={selectedYear} onChange={setSelectedYear} suffix="年" />
                  <WheelColumn label="月份" options={MONTHS} value={selectedMonth} onChange={setSelectedMonth} suffix="月" />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 text-center">
                  <p className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                    换胎里程
                  </p>
                  <p className="mt-1 text-gray-400" style={{ fontSize: "0.75rem" }}>
                    {mileageValue} km
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <WheelColumn label="万公里" options={MILEAGE_WAN} value={mileageWan} onChange={setMileageWan} suffix="万" />
                  <WheelColumn label="千公里" options={MILEAGE_QIAN} value={mileageQian} onChange={setMileageQian} suffix="千" />
                </div>
              </>
            )}

            <button
              onClick={() => setActiveSheet(null)}
              className="mt-5 w-full rounded-[22px] bg-[#171d2b] py-3 text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)] transition-colors hover:bg-[#111827]"
              style={{ fontSize: "0.9375rem", fontWeight: 700 }}
            >
              确认选择
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
