import { Share2, ChevronRight, ShieldCheck, Star } from "lucide-react";
import { useParams, Link } from "react-router";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { ProductVisual } from "../components/ProductVisual";
import { SectionCard } from "../components/SectionCard";
import { CURRENT_VEHICLE_ID, MOCK_PRODUCTS, MOCK_VEHICLES } from "../data/mock";

const currentVehicle =
  MOCK_VEHICLES.find((v) => v.vehicleId === CURRENT_VEHICLE_ID) ?? MOCK_VEHICLES[0];

export function TireDetail() {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const isMatched = product.matchedSpecCode === currentVehicle.matchedSpecCode;

  return (
    <div className="min-h-screen bg-[#f3f6fb] pb-44">
      <Header title="轮胎详情" showBack showBell={false} />

      <div className="max-w-md mx-auto">
        {/* 商品图片 */}
        <div
          className="relative overflow-hidden px-4 pb-2 pt-4"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(59,130,246,0.14), transparent 34%), linear-gradient(180deg, #f8fbff 0%, rgba(243,246,251,0) 100%)",
          }}
        >
          <SectionCard className="overflow-hidden p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[0.6875rem] font-semibold text-white">
                    {product.spec}
                  </span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.6875rem] font-semibold text-blue-600">
                    {product.badge}
                  </span>
                </div>
                <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                  {product.brand}
                </h2>
                <p className="mt-1 text-gray-500" style={{ fontSize: "0.875rem" }}>
                  {product.name}
                </p>
              </div>
              <ProductVisual product={product} className="h-28 w-28" />
            </div>
          </SectionCard>

          {/* 促销横幅 */}
          <div className="absolute bottom-6 left-8 right-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3">
              <div className="bg-red-500 text-white px-2 py-1 rounded-lg flex-shrink-0" style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                -{discount}%
              </div>
              <div>
                <p className="text-gray-800" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                  购胎包安装 · 含动平衡费用
                </p>
                <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>
                  活动截止：2026-04-30
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* 基础信息 */}
          <SectionCard className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded ${
                      isMatched ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"
                    }`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {product.spec}
                  </span>
                  <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded" style={{ fontSize: "0.75rem" }}>
                    {product.badge}
                  </span>
                  {isMatched && (
                    <span className="bg-blue-500 text-white px-2 py-0.5 rounded" style={{ fontSize: "0.75rem" }}>
                      适配您的车
                    </span>
                  )}
                </div>
                <h2 className="text-gray-900" style={{ fontWeight: 600, fontSize: "1.125rem" }}>
                  {product.brand}
                </h2>
                <p className="text-gray-500 mt-0.5" style={{ fontSize: "0.875rem" }}>{product.name}</p>
              </div>
              <button className="p-2 -mt-1 -mr-1 hover:bg-gray-50 rounded-full">
                <Share2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* 特性标签 */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.features.map((f) => (
                <span key={f} className="bg-gray-50 border border-gray-200 text-gray-600 px-2 py-1 rounded-lg" style={{ fontSize: "0.75rem" }}>
                  {f}
                </span>
              ))}
            </div>

            {/* 价格 */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-red-500" style={{ fontWeight: 700, fontSize: "1.875rem" }}>
                ¥{product.price}
              </span>
              <span className="text-gray-400 line-through" style={{ fontSize: "1rem" }}>
                ¥{product.originalPrice}
              </span>
              <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded" style={{ fontSize: "0.75rem" }}>
                省 ¥{product.originalPrice - product.price}
              </span>
            </div>

            {/* 适配车辆 */}
            <div className="bg-blue-50 rounded-xl p-3 mb-4">
              <p className="text-blue-600" style={{ fontSize: "0.8125rem" }}>
                <span style={{ fontWeight: 500 }}>当前车辆：</span>
                {currentVehicle.modelName} · {currentVehicle.tireSpec}
                {isMatched ? (
                  <span className="text-blue-500 ml-2">✓ 规格匹配</span>
                ) : (
                  <span className="text-orange-500 ml-2">⚠ 规格不匹配</span>
                )}
              </p>
            </div>

            {/* 产品描述 */}
            <p className="text-gray-600" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>
              {product.description}
            </p>

            <p className="text-gray-500 mt-3" style={{ fontSize: "0.8125rem", lineHeight: 1.75 }}>
              需到店安装轮胎，商城价格已包含材料费、工时费、动平衡及轮胎气压检测服务。
              若店里有库存可直接到店安装，若需订货以店端到货时间为准。
              <br />
              <span className="text-gray-400">到货时效参考：马牌轮胎1日可达，其他品牌一般3~5日。</span>
            </p>
          </SectionCard>

          {/* 快捷服务 */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500 text-white px-2 py-0.5 rounded" style={{ fontSize: "0.75rem" }}>
                快捷服务
              </span>
            </div>
            <p className="text-gray-700" style={{ fontSize: "0.875rem" }}>
              比亚迪授权服务门店储备商品库存，顾客购买后即可到服务门店获得服务，高效快捷。
            </p>
          </div>

          {/* 正品保障 */}
          <Link to="/knowledge" className="flex items-center justify-between rounded-[28px] border border-white/80 bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_18px_36px_rgba(15,23,42,0.10)]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <div>
                <p style={{ fontWeight: 500, fontSize: "0.9375rem" }}>正品保障</p>
                <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.75rem" }}>原厂授权，假一赔十</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          {/* 评分 */}
          <SectionCard className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 style={{ fontWeight: 600, fontSize: "0.9375rem" }}>用户评价</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700" style={{ fontWeight: 500 }}>4.8</span>
                <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>/ 5.0</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: "车主 L***8", text: "装上后明显感觉安静很多，高速稳定性很好，符合预期。", star: 5 },
                { name: "车主 W***5", text: "原厂推荐规格，装上后操控和原车一致，购买放心。", star: 5 },
              ].map((review, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span style={{ fontWeight: 500, fontSize: "0.875rem" }}>{review.name}</span>
                    <div className="flex">
                      {Array.from({ length: review.star }).map((_, si) => (
                        <Star key={si} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600" style={{ fontSize: "0.8125rem" }}>{review.text}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* 底部购买按钮 */}
      <div className="fixed inset-x-0 bottom-[86px] z-40 px-4">
        <div className="mx-auto flex max-w-md gap-3 rounded-[28px] border border-white/80 bg-white/94 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur-md">
          <Link
            to="/appointment"
            className="flex-1 bg-gray-900 text-white py-3.5 rounded-full text-center hover:bg-gray-800 transition-colors"
            style={{ fontWeight: 500 }}
          >
            立即预约安装
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
