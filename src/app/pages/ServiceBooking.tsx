import { useState } from "react";
import {
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Headset,
  House,
  Store,
  Truck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { MOCK_VEHICLES, type AppointmentMode } from "../data/mock";

type SubmitState = "idle" | "loading" | "success";

export function ServiceBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<AppointmentMode>("PICKUP");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const vehicleId =
    (location.state as { vehicleId?: string } | null)?.vehicleId ?? MOCK_VEHICLES[0].vehicleId;
  const currentVehicle =
    MOCK_VEHICLES.find((vehicle) => vehicle.vehicleId === vehicleId) ?? MOCK_VEHICLES[0];

  const handleSubmit = async () => {
    setSubmitState("loading");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitState("success");
  };

  if (submitState === "success") {
    return (
      <div className="min-h-screen bg-[#f7f8fb]">
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-800"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-gray-900" style={{ fontSize: "1.0625rem", fontWeight: 700 }}>
              预约结果
            </h1>
            <div className="w-10" />
          </div>
        </header>

        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col items-center justify-center px-4 pb-20">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-sm">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="mb-2 text-gray-900" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            预约成功！
          </h2>
          <p className="mb-1 text-center text-gray-500" style={{ fontSize: "0.9375rem" }}>
            {currentVehicle.modelName} · {currentVehicle.licensePlate}
          </p>
          <p className="mb-6 text-center text-gray-400" style={{ fontSize: "0.875rem" }}>
            {mode === "PICKUP" ? "上门取送车" : "自行到店"} · 客服将与您联系确认时间
          </p>

          <div className="mb-6 w-full rounded-[28px] border border-gray-100 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-gray-400" style={{ fontSize: "0.875rem" }}>车辆</span>
                <span className="text-gray-900" style={{ fontSize: "0.875rem" }}>{currentVehicle.modelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400" style={{ fontSize: "0.875rem" }}>车牌</span>
                <span className="text-gray-900" style={{ fontSize: "0.875rem" }}>{currentVehicle.licensePlate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400" style={{ fontSize: "0.875rem" }}>服务方式</span>
                <span className="text-gray-900" style={{ fontSize: "0.875rem" }}>
                  {mode === "PICKUP" ? "上门取送车" : "自行到店"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3">
            <Link
              to="/home"
              className="flex-1 rounded-full border border-gray-200 py-3 text-center text-gray-600 transition-colors hover:bg-gray-50"
              style={{ fontSize: "0.9375rem" }}
            >
              返回首页
            </Link>
            <button
              onClick={() => setSubmitState("idle")}
              className="flex-1 rounded-full bg-[#161d2c] py-3 text-white transition-colors hover:bg-[#111827]"
              style={{ fontSize: "0.9375rem", fontWeight: 600 }}
            >
              再次预约
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] pb-28">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-gray-800"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-gray-900" style={{ fontSize: "1.0625rem", fontWeight: 700 }}>
            服务预约
          </h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-800">
            <CalendarClock className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-md space-y-7 px-4 pt-6">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>
              当前车辆({MOCK_VEHICLES.length})
            </h2>
            <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-white px-4 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="flex items-center gap-4">
              <img
                src={currentVehicle.image}
                alt={currentVehicle.modelName}
                className="h-24 w-32 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <p className="text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {currentVehicle.modelName}
                </p>
                <p className="mt-2 text-gray-400" style={{ fontSize: "0.875rem" }}>
                  {currentVehicle.licensePlate}
                </p>
                <p className="mt-2 text-gray-400" style={{ fontSize: "0.875rem" }}>
                  车架号后6位： {currentVehicle.vin}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-5 text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>
            选择到店模式
          </h2>

          <div className="flex items-start justify-center gap-4">
            <button
              onClick={() => setMode("PICKUP")}
              className={`relative w-[8.75rem] rounded-[24px] border-2 px-3 pb-3 pt-4 transition-all ${
                mode === "PICKUP"
                  ? "border-sky-400 bg-sky-50 shadow-[0_12px_28px_rgba(59,130,246,0.12)]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full ${
                  mode === "PICKUP" ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-300"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] ${
                  mode === "PICKUP" ? "bg-sky-100 text-sky-500" : "bg-gray-100 text-gray-300"
                }`}
              >
                <Truck className="h-8 w-8" strokeWidth={1.9} />
              </div>
              <p className="mt-3 text-center text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                上门取送车
              </p>
            </button>

            <button
              onClick={() => setMode("SELF")}
              className={`relative w-[8.75rem] rounded-[24px] border-2 px-3 pb-3 pt-4 transition-all ${
                mode === "SELF"
                  ? "border-sky-400 bg-sky-50 shadow-[0_12px_28px_rgba(59,130,246,0.12)]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full ${
                  mode === "SELF" ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-300"
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </div>
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] ${
                  mode === "SELF" ? "bg-sky-100 text-sky-500" : "bg-gray-100 text-gray-300"
                }`}
              >
                <Store className="h-8 w-8" strokeWidth={1.9} />
              </div>
              <p className="mt-3 text-center text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                自行到店
              </p>
            </button>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/98 backdrop-blur-sm">
        <div className="mx-auto flex max-w-md items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-8 text-gray-900">
            <Link to="/home" className="flex flex-col items-center gap-1">
              <House className="h-7 w-7" strokeWidth={1.8} />
              <span style={{ fontSize: "0.8125rem" }}>主页</span>
            </Link>
            <button className="flex flex-col items-center gap-1 text-gray-900">
              <Headset className="h-7 w-7" strokeWidth={1.8} />
              <span style={{ fontSize: "0.8125rem" }}>客服</span>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitState === "loading"}
            className="min-w-[9rem] rounded-[22px] bg-[#161d2c] px-8 py-3 text-white shadow-[0_12px_24px_rgba(15,23,42,0.16)] transition-colors hover:bg-[#111827] disabled:bg-gray-400"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            {submitState === "loading" ? "提交中..." : "下一步"}
          </button>
        </div>
      </div>
    </div>
  );
}
