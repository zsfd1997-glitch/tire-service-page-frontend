import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router";
import { BottomNav } from "../components/BottomNav";
import { Header } from "../components/Header";
import { MOCK_VEHICLES } from "../data/mock";

const WIDTH_OPTIONS = [165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265];
const ASPECT_OPTIONS = [40, 45, 50, 55, 60, 65];
const RIM_OPTIONS = [15, 16, 17, 18, 19, 20, 21];
const ITEM_HEIGHT = 44;

function parseSpec(spec: string) {
  const matched = spec.match(/(\d+)\/(\d+)R(\d+)/);
  if (!matched) {
    return { width: 195, aspect: 60, rim: 16 };
  }

  return {
    width: Number(matched[1]),
    aspect: Number(matched[2]),
    rim: Number(matched[3]),
  };
}

function WheelColumn({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: number[];
  value: number;
  onChange: (next: number) => void;
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TireSpecSelector() {
  const { id } = useParams<{ id: string }>();

  const vehicle = useMemo(
    () => MOCK_VEHICLES.find((item) => item.vehicleId === id) ?? MOCK_VEHICLES[0],
    [id]
  );
  const initial = useMemo(() => parseSpec(vehicle.tireSpec), [vehicle.tireSpec]);

  const [width, setWidth] = useState(initial.width);
  const [aspect, setAspect] = useState(initial.aspect);
  const [rim, setRim] = useState(initial.rim);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    setWidth(initial.width);
    setAspect(initial.aspect);
    setRim(initial.rim);
  }, [initial]);

  const fullSpec = `${width}/${aspect}R${rim}`;

  return (
    <div className="min-h-screen bg-[#f7f8fb] pb-20">
      <Header title="服务" showBack />

      <div className="mx-auto max-w-md space-y-4 px-4 pt-4">
        <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
          <div className="px-4 pt-4">
            <p className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
              {vehicle.modelName}
            </p>
            <p className="mt-1 text-gray-400" style={{ fontSize: "0.75rem" }}>
              给您推荐适配选择
            </p>
          </div>

          <button
            onClick={() => setIsPickerOpen(true)}
            className="mt-4 w-full border-t border-gray-100 px-4 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                点击数值后选择
              </p>
              <span className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                {fullSpec}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "胎面宽度", value: width },
                { label: "扁平比", value: aspect },
                { label: "轮毂尺寸", value: rim },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                    {item.label}
                  </p>
                  <p className="mt-2 text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "换轮胎为什么要选规格？",
              desc: "轮胎规格决定了车辆的抓地力、舒适性和安全性。建议优先按照原厂规格进行更换，避免出现里程误差、底盘剐蹭或年检风险。",
            },
            {
              title: "轮胎尺寸和规格介绍",
              desc: "胎面宽度影响接地面积，扁平比影响舒适与支撑，轮毂尺寸决定轮胎安装口径。三者组合后才是完整的适配规格。",
            },
            {
              title: "轮胎的生产日期怎么看？",
              desc: "可在胎侧 DOT 编码中查看生产周数和年份。通常建议优先选择近一年内生产的轮胎，以保证橡胶状态和使用寿命。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-gray-100 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700 }}>问</span>
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {item.title}
                  </p>
                  <div className="mt-3 flex items-start gap-3">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700 }}>答</span>
                    </div>
                    <p className="text-gray-500" style={{ fontSize: "0.8125rem", lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[1px]">
          <button
            className="absolute inset-0"
            aria-label="关闭轮胎规格选择"
            onClick={() => setIsPickerOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto w-[calc(100%-2rem)] max-w-[26rem] rounded-t-[28px] bg-white px-4 pb-6 pt-3 shadow-[0_-18px_40px_rgba(15,23,42,0.18)]">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" />
            <div className="mb-4 text-center">
              <p className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                {vehicle.modelName}
              </p>
              <p className="mt-1 text-gray-400" style={{ fontSize: "0.75rem" }}>
                当前规格 {fullSpec}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <WheelColumn label="胎面宽度" options={WIDTH_OPTIONS} value={width} onChange={setWidth} />
              <WheelColumn label="扁平比" options={ASPECT_OPTIONS} value={aspect} onChange={setAspect} />
              <WheelColumn label="轮毂尺寸" options={RIM_OPTIONS} value={rim} onChange={setRim} />
            </div>

            <button
              onClick={() => setIsPickerOpen(false)}
              className="mt-5 w-full rounded-[22px] bg-[#171d2b] py-3 text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)] transition-colors hover:bg-[#111827]"
              style={{ fontSize: "0.9375rem", fontWeight: 700 }}
            >
              确认规格
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
