import { useState } from "react";
import { ChevronRight, ChevronLeft, Bell, Bot } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { BottomNav } from "../components/BottomNav";
import {
  MOCK_VEHICLES,
  MOCK_PRODUCTS,
  MOCK_KNOWLEDGE,
  VEHICLE_MODULES,
  HEALTH_LABELS,
  type Vehicle,
} from "../data/mock";

function HealthProgressBar({ score, status }: { score: number; status: string }) {
  const colorMap: Record<string, string> = {
    HEALTHY: "from-green-400 to-green-500",
    ROTATE: "from-yellow-400 to-orange-400",
    REPLACE: "from-orange-500 to-red-500",
  };
  return (
    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colorMap[status] || "from-gray-400 to-gray-500"} rounded-full transition-all duration-500`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [currentVehicleIndex, setCurrentVehicleIndex] = useState(0);
  const currentVehicle: Vehicle = MOCK_VEHICLES[currentVehicleIndex];
  const modules = VEHICLE_MODULES[currentVehicle.vehicleId] || {};
  const healthInfo = HEALTH_LABELS[currentVehicle.healthStatus];

  const prevVehicle = () =>
    setCurrentVehicleIndex((i) => (i - 1 + MOCK_VEHICLES.length) % MOCK_VEHICLES.length);
  const nextVehicle = () =>
    setCurrentVehicleIndex((i) => (i + 1) % MOCK_VEHICLES.length);

  const recommendedProducts = MOCK_PRODUCTS.filter(
    (p) => p.matchedSpecCode === currentVehicle.matchedSpecCode
  ).slice(0, 2);

  const weeklyKnowledge = MOCK_KNOWLEDGE.slice(0, 3);

  const mileDone = currentVehicle.currentMileage - currentVehicle.lastReplacedMileage;
  const milePercent = Math.min(100, Math.round((mileDone / currentVehicle.maxMileage) * 100));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white z-40 border-b border-gray-100">
        <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white" style={{ fontSize: "1rem" }}>🛞</span>
            </div>
            <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>轮胎助手</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative">
            <img
              src={currentVehicle.image}
              alt={currentVehicle.modelName}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <button
              onClick={prevVehicle}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/50"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={nextVehicle}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/50"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>

            <div className="absolute bottom-3 left-4 right-4">
              <div>
                <p className="text-white" style={{ fontWeight: 600, fontSize: "1.125rem" }}>
                  {currentVehicle.modelName}
                </p>
                <p className="text-white/80" style={{ fontSize: "0.75rem" }}>
                  {currentVehicle.licensePlate}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-1.5 py-3">
            {MOCK_VEHICLES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentVehicleIndex(idx)}
                className={`rounded-full transition-all ${
                  idx === currentVehicleIndex
                    ? "w-4 h-1.5 bg-blue-500"
                    : "w-1.5 h-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-base text-gray-900" style={{ fontWeight: 600 }}>轮胎健康度</h2>
              <span
                className={`px-3 py-1.5 rounded-2xl ${healthInfo.bgColor} ${healthInfo.color}`}
                style={{ fontSize: "0.8125rem", fontWeight: 600, lineHeight: 1 }}
              >
                {healthInfo.label}
              </span>
            </div>
            <Link
              to="/records"
              state={{ vehicleId: currentVehicle.vehicleId, source: "home-health-card" }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              style={{ fontSize: "0.8125rem", fontWeight: 500 }}
            >
              添加换胎记录
            </Link>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600" style={{ fontSize: "0.875rem" }}>
              轮胎规格：
            </span>
            <button
              onClick={() => navigate(`/tire-spec/${currentVehicle.vehicleId}`)}
              className="flex items-center gap-1"
            >
              <span style={{ fontWeight: 500, fontSize: "0.875rem" }}>{currentVehicle.tireSpec}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <p className="text-gray-500 mb-3" style={{ fontSize: "0.875rem" }}>
            {healthInfo.desc}
          </p>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1" style={{ fontSize: "0.75rem" }}>
              <span className="text-gray-500">已使用里程</span>
              <span className="text-gray-400">
                {(mileDone / 10000).toFixed(1)}万 / {(currentVehicle.maxMileage / 10000).toFixed(0)}万 km
              </span>
            </div>
            <HealthProgressBar score={milePercent} status={currentVehicle.healthStatus} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(${
                    currentVehicle.healthStatus === "HEALTHY"
                      ? "#22c55e"
                      : currentVehicle.healthStatus === "ROTATE"
                      ? "#eab308"
                      : "#ef4444"
                  } ${currentVehicle.healthScore * 3.6}deg, #f3f4f6 0deg)`,
                }}
              >
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span style={{ fontSize: "0.5rem", fontWeight: 700, color: "#374151" }}>
                    {currentVehicle.healthScore}
                  </span>
                </div>
              </div>
              <span className="text-gray-500" style={{ fontSize: "0.75rem" }}>健康分</span>
            </div>
            <button
              onClick={() =>
                navigate("/appointment", {
                  state: { vehicleId: currentVehicle.vehicleId, source: "home-health-card" },
                })
              }
              className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
              style={{ fontSize: "0.875rem" }}
            >
              一键预约
            </button>
          </div>
        </div>

        {modules.weeklyKnowledge?.state !== "hidden" && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontWeight: 600, fontSize: "0.9375rem" }}>轮胎小知识</h3>
              <Link
                to="/knowledge"
                className="text-blue-500 flex items-center gap-1"
                style={{ fontSize: "0.75rem" }}
              >
                更多 <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {weeklyKnowledge.map((item) => (
                <Link
                  key={item.id}
                  to="/knowledge"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="group-hover:text-blue-600 transition-colors" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                      {item.title}
                    </p>
                    <p className="text-gray-500 mt-0.5 line-clamp-2" style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                      {item.content}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontWeight: 600, fontSize: "0.9375rem" }}>轮胎小管家</h3>
            <Link
              to="/store-location"
              state={{ vehicleId: currentVehicle.vehicleId, source: "tire-steward" }}
              className="text-gray-400 flex items-center gap-1"
              style={{ fontSize: "0.75rem" }}
            >
              一键咨询 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p style={{ fontWeight: 500, fontSize: "0.875rem" }}>轮胎事，找小管家</p>
              <p className="text-yellow-600 mt-0.5" style={{ fontSize: "0.75rem" }}>在线轮胎顾问 · 全天候服务</p>
            </div>
          </div>
        </div>

        <Link to={`/ai-inspection/${currentVehicle.vehicleId}`} className="block">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-4 shadow-lg flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <p style={{ fontWeight: 600 }}>AI 一键识别磨损</p>
                <p className="text-blue-100" style={{ fontSize: "0.75rem" }}>拍照上传，智能分析轮胎状态</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/70" />
          </div>
        </Link>

        {modules.productStrip?.state !== "hidden" && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="mb-3">
              <h3 style={{ fontWeight: 600, fontSize: "0.9375rem" }}>轮胎智能购</h3>
            </div>

            <div className="mb-3 rounded-2xl bg-gray-50 px-4 py-3 text-center text-gray-600">
              <p style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                原厂轮胎 · 正品保障 · 平价直供 · 售后无忧
              </p>
            </div>

            {modules.productStrip?.state === "conflict" ? (
              <p className="text-gray-400 text-center py-4" style={{ fontSize: "0.875rem" }}>
                商品数据暂时不可用，请稍后再试
              </p>
            ) : (
              <div className="space-y-0">
                {recommendedProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className={`flex items-center gap-3 py-3 transition-colors hover:bg-gray-50 ${
                      index !== recommendedProducts.length - 1 ? "border-b border-dashed border-gray-200" : ""
                    }`}
                  >
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.06)]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-gray-900" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                          {product.name}
                        </p>
                        <span
                          className="flex-shrink-0 rounded-md bg-green-500/90 px-2 py-0.5 text-white"
                          style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                        >
                          适配
                        </span>
                      </div>

                      <p className="mt-1 text-gray-500" style={{ fontSize: "0.8125rem" }}>
                        {product.spec} {product.brand}
                      </p>
                      <p className="mt-0.5 text-gray-400" style={{ fontSize: "0.75rem" }}>
                        ({product.description})
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className="rounded-md bg-red-50 px-1.5 py-0.5 text-red-500"
                          style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                        >
                          券后
                        </span>
                        <span className="text-red-500" style={{ fontWeight: 700, fontSize: "1rem" }}>
                          ¥{product.price.toLocaleString()}
                        </span>
                        <span className="text-gray-300 line-through" style={{ fontSize: "0.75rem" }}>
                          ¥{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    </div>
                  </Link>
                ))}

                <div className="pt-5 flex justify-end">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-white transition-colors hover:bg-gray-800"
                    style={{ fontSize: "0.875rem", fontWeight: 600 }}
                  >
                    一键购买
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
