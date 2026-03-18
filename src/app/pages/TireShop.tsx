import { useState } from "react";
import { Heart, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { ProductVisual } from "../components/ProductVisual";
import { SectionCard } from "../components/SectionCard";
import { CURRENT_VEHICLE_ID, MOCK_PRODUCTS, MOCK_VEHICLES, type Product } from "../data/mock";

const currentVehicle =
  MOCK_VEHICLES.find((v) => v.vehicleId === CURRENT_VEHICLE_ID) ?? MOCK_VEHICLES[0];

type FilterSpec = "ALL" | string;

const SPECS = Array.from(new Set(MOCK_PRODUCTS.map((p) => p.spec)));

export function TireShop() {
  const [filterSpec, setFilterSpec] = useState<FilterSpec>("ALL");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filtered =
    filterSpec === "ALL"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.spec === filterSpec);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f6fb] pb-28">
      <Header title="轮胎智能购" showBack />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 当前车辆匹配规格提示 */}
        <SectionCard className="flex items-center justify-between rounded-[26px] border-blue-100 bg-blue-50 px-4 py-3">
          <div>
            <p className="text-blue-700" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
              {currentVehicle.modelName}
            </p>
            <p className="text-blue-500 mt-0.5" style={{ fontSize: "0.75rem" }}>
              适配规格：{currentVehicle.tireSpec}
            </p>
          </div>
          <button className="flex items-center gap-1 text-blue-600 bg-blue-100 px-3 py-1.5 rounded-lg" style={{ fontSize: "0.75rem" }}>
            切换车辆 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </SectionCard>

        {/* 服务亮点 */}
        <SectionCard className="p-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { icon: "🏭", label: "原厂认证" },
              { icon: "✅", label: "正品保障" },
              { icon: "💰", label: "平价直供" },
              { icon: "🛡️", label: "售后无忧" },
            ].map((item) => (
              <div key={item.label}>
                <div className="w-11 h-11 mx-auto mb-1 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                  <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                </div>
                <p className="text-gray-600" style={{ fontSize: "0.625rem" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 规格筛选 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterSpec("ALL")}
            className={`px-4 py-2 rounded-full flex-shrink-0 transition-all ${
              filterSpec === "ALL"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
            style={{ fontSize: "0.875rem" }}
          >
            全部规格
          </button>
          {SPECS.map((spec) => (
            <button
              key={spec}
              onClick={() => setFilterSpec(spec)}
              className={`px-3 py-2 rounded-full flex-shrink-0 transition-all ${
                filterSpec === spec
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* 商品列表 */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl">
            <p className="text-gray-400 text-3xl mb-2">🛞</p>
            <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>暂无该规格商品</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.has(product.id)}
                onToggleFavorite={() => toggleFavorite(product.id)}
                currentSpec={currentVehicle.tireSpec}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  currentSpec,
}: {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  currentSpec: string;
}) {
  const isMatched = product.spec === currentSpec;
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <Link
      to={`/products/${product.id}`}
      className="block overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_16px_36px_rgba(15,23,42,0.07)] transition-shadow hover:shadow-[0_20px_40px_rgba(15,23,42,0.10)]"
    >
      <div className="flex gap-3 p-4">
        <div className="relative flex-shrink-0">
          <ProductVisual product={product} />
          <span className="absolute top-0 left-0 bg-red-500 text-white px-1.5 py-0.5 rounded-tl-xl rounded-br-xl" style={{ fontSize: "0.625rem" }}>
            -{discount}%
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 truncate" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                {product.brand}
              </p>
              <p className="text-gray-500 truncate mt-0.5" style={{ fontSize: "0.8125rem" }}>
                {product.name}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite();
              }}
              className="flex-shrink-0 p-1"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`px-2 py-0.5 rounded ${
                isMatched ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"
              }`}
              style={{ fontSize: "0.6875rem" }}
            >
              {product.spec}
            </span>
            <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded" style={{ fontSize: "0.6875rem" }}>
              {product.badge}
            </span>
            {isMatched && (
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded" style={{ fontSize: "0.6875rem" }}>
                适配您的车
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.features.map((f) => (
              <span key={f} className="bg-gray-50 border border-gray-100 text-gray-500 px-1.5 py-0.5 rounded" style={{ fontSize: "0.625rem" }}>
                {f}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-red-500" style={{ fontWeight: 700, fontSize: "1.0625rem" }}>
                ¥{product.price}
              </span>
              <span className="text-gray-400 line-through" style={{ fontSize: "0.75rem" }}>
                ¥{product.originalPrice}
              </span>
            </div>
            <span
              className={`px-2 py-0.5 rounded ${
                product.stock ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
              }`}
              style={{ fontSize: "0.75rem" }}
            >
              {product.stock ? "有货" : "暂无库存"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
