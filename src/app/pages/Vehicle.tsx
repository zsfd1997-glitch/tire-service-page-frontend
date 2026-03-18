import { useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronRight, AlertTriangle, RotateCcw, Bot } from "lucide-react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import {
  MOCK_VEHICLES,
  VEHICLE_MODULES,
  HEALTH_LABELS,
  MOCK_PRODUCTS,
  type HealthStatus,
} from "../data/mock";

type Tab = "health" | "replace";

export function Vehicle() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("health");
  const [ackDone, setAckDone] = useState(false);

  const vehicle = MOCK_VEHICLES.find((v) => v.vehicleId === id) ?? MOCK_VEHICLES[0];
  const modules = VEHICLE_MODULES[vehicle.vehicleId] || {};
  const healthInfo = HEALTH_LABELS[vehicle.healthStatus];

  const mileDone = vehicle.currentMileage - vehicle.lastReplacedMileage;
  const milePercent = Math.min(100, Math.round((mileDone / vehicle.maxMileage) * 100));

  const matchedProducts = MOCK_PRODUCTS.filter(
    (p) => p.matchedSpecCode === vehicle.matchedSpecCode
  ).slice(0, 2);

  const showServiceCard =
    vehicle.healthStatus !== "HEALTHY" &&
    modules.serviceCard?.state === "ready" &&
    !ackDone;

  const colorMap: Record<HealthStatus, string> = {
    HEALTHY: "from-green-400 to-green-500",
    ROTATE: "from-yellow-400 to-orange-400",
    REPLACE: "from-orange-500 to-red-500",
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="车辆详情" showBack />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 标签切换 */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("health")}
            className={`px-4 py-2 rounded-full transition-all ${
              activeTab === "health"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            style={{ fontSize: "0.875rem" }}
          >
            轮胎健康度
          </button>
          <button
            onClick={() => setActiveTab("replace")}
            className={`px-4 py-2 rounded-full transition-all ${
              activeTab === "replace"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            style={{ fontSize: "0.875rem" }}
          >
            轮胎更换
          </button>
        </div>

        {/* 车辆基础信息 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img
            src={vehicle.image}
            alt={vehicle.modelName}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 style={{ fontWeight: 600, fontSize: "1.125rem" }}>{vehicle.modelName}</h2>
                <p className="text-gray-500 mt-0.5" style={{ fontSize: "0.875rem" }}>
                  车牌：{vehicle.licensePlate}
                </p>
                <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.75rem" }}>
                  车架号后6位：{vehicle.vin}
                </p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full ${healthInfo.bgColor} ${healthInfo.color}`}
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {healthInfo.label}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3">
              <div>
                <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>当前里程</p>
                <p style={{ fontWeight: 600, fontSize: "1rem" }}>
                  {(vehicle.currentMileage / 10000).toFixed(1)}
                  <span className="text-gray-500" style={{ fontWeight: 400, fontSize: "0.75rem" }}>万km</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>轮胎规格</p>
                <p style={{ fontWeight: 600, fontSize: "1rem" }}>{vehicle.tireSpec}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 服务卡提醒（仅 REPLACE/ROTATE 且 module=ready 且未确认）*/}
        {showServiceCard && (
          <div
            className={`rounded-2xl p-4 border ${
              vehicle.healthStatus === "REPLACE"
                ? "bg-red-50 border-red-200"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-start gap-3">
              {vehicle.healthStatus === "REPLACE" ? (
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <RotateCcw className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={vehicle.healthStatus === "REPLACE" ? "text-red-700" : "text-yellow-700"}
                  style={{ fontWeight: 600, fontSize: "0.9375rem" }}
                >
                  {vehicle.healthStatus === "REPLACE" ? "强烈建议更换轮胎" : "建议进行轮胎换位"}
                </p>
                <p
                  className={`mt-1 ${
                    vehicle.healthStatus === "REPLACE" ? "text-red-600" : "text-yellow-600"
                  }`}
                  style={{ fontSize: "0.8125rem" }}
                >
                  {vehicle.healthStatus === "REPLACE"
                    ? `轮胎已行驶 ${(mileDone / 10000).toFixed(1)}万km，超过建议更换里程，存在安全隐患。`
                    : `轮胎磨损不均，建议行驶里程 ${(vehicle.currentMileage / 10000).toFixed(1)}万km 时进行换位。`}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Link
                    to="/appointment"
                    className={`flex-1 text-center py-2 rounded-xl ${
                      vehicle.healthStatus === "REPLACE"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    } transition-colors`}
                    style={{ fontSize: "0.875rem", fontWeight: 500 }}
                  >
                    立即预约处理
                  </Link>
                  <button
                    onClick={() => setAckDone(true)}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  >
                    稍后处理
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "health" ? (
          <>
            {/* 健康度进度 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ fontWeight: 600, fontSize: "0.9375rem" }}>健康度分析</h3>
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(${
                        vehicle.healthStatus === "HEALTHY"
                          ? "#22c55e"
                          : vehicle.healthStatus === "ROTATE"
                          ? "#eab308"
                          : "#ef4444"
                      } ${vehicle.healthScore * 3.6}deg, #f3f4f6 0deg)`,
                    }}
                  >
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <span style={{ fontSize: "0.625rem", fontWeight: 700 }}>{vehicle.healthScore}</span>
                    </div>
                  </div>
                  <span className="text-gray-500" style={{ fontSize: "0.75rem" }}>健康分</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1" style={{ fontSize: "0.75rem" }}>
                    <span className="text-gray-500">使用里程</span>
                    <span className="text-gray-700">
                      {(mileDone / 10000).toFixed(1)}万 / {(vehicle.maxMileage / 10000).toFixed(0)}万 km
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${colorMap[vehicle.healthStatus]} rounded-full transition-all`}
                      style={{ width: `${milePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                {vehicle.healthStatus === "HEALTHY" ? (
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                )}
                <p className="text-gray-600" style={{ fontSize: "0.8125rem" }}>
                  {healthInfo.desc}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <span className="text-gray-500" style={{ fontSize: "0.875rem" }}>进店享免费检测</span>
                <Link
                  to="/appointment"
                  className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-colors"
                  style={{ fontSize: "0.875rem" }}
                >
                  一键预约
                </Link>
              </div>
            </div>

            <Link to={`/ai-inspection/${vehicle.vehicleId}`} className="block">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: "0.9375rem" }}>AI 磨损识别</h3>
                      <p className="text-gray-400 mt-1" style={{ fontSize: "0.75rem" }}>
                        上传轮胎照片后进行识别分析
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Link>
          </>
        ) : (
          <>
            {/* 轮胎更换 - 匹配商品 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ fontWeight: 600, fontSize: "0.9375rem" }}>适配您的轮胎</h3>
                <span className="text-gray-500" style={{ fontSize: "0.75rem" }}>{vehicle.tireSpec}</span>
              </div>

              {matchedProducts.length === 0 ? (
                <p className="text-gray-400 text-center py-4" style={{ fontSize: "0.875rem" }}>
                  暂无匹配商品，请联系客服
                </p>
              ) : (
                <div className="space-y-3">
                  {matchedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontWeight: 500, fontSize: "0.875rem" }}>{product.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.features.map((f) => (
                            <span key={f} className="bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded" style={{ fontSize: "0.625rem" }}>
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-red-500" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                            ¥{product.price}
                          </span>
                          <span className="text-gray-400 line-through" style={{ fontSize: "0.75rem" }}>
                            ¥{product.originalPrice}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 self-center flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 服务承诺 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="mb-3" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>服务保障</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: "🔧", label: "包安装" },
                  { icon: "⚖️", label: "动平衡" },
                  { icon: "💨", label: "免费充气" },
                  { icon: "🛡️", label: "质量保障" },
                  { icon: "✅", label: "正品验证" },
                  { icon: "📞", label: "售后无忧" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-1.5 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
                      <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                    </div>
                    <p className="text-gray-600" style={{ fontSize: "0.75rem" }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
