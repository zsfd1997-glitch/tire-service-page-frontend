import type { Product } from "../data/mock";
import { cn } from "./ui/utils";

const toneMap: Record<string, { base: string; glow: string; pill: string }> = {
  "米其林（Michelin）": {
    base: "#295CFF",
    glow: "rgba(41,92,255,0.22)",
    pill: "rgba(41,92,255,0.12)",
  },
  "马牌（Continental）": {
    base: "#F59E0B",
    glow: "rgba(245,158,11,0.22)",
    pill: "rgba(245,158,11,0.16)",
  },
  "倍耐力（Pirelli）": {
    base: "#EF4444",
    glow: "rgba(239,68,68,0.2)",
    pill: "rgba(239,68,68,0.12)",
  },
  "韩泰（Hankook）": {
    base: "#10B981",
    glow: "rgba(16,185,129,0.2)",
    pill: "rgba(16,185,129,0.12)",
  },
  "固特异（Goodyear）": {
    base: "#0F172A",
    glow: "rgba(15,23,42,0.22)",
    pill: "rgba(15,23,42,0.08)",
  },
};

function getTone(brand: string) {
  return toneMap[brand] ?? toneMap["固特异（Goodyear）"];
}

function getBrandShort(brand: string) {
  return brand.replace(/（.*?）/g, "").replace(/\(.+?\)/g, "").trim();
}

export function ProductVisual({
  product,
  className,
  compact = false,
}: {
  product: Product;
  className?: string;
  compact?: boolean;
}) {
  const tone = getTone(product.brand);
  const brandShort = getBrandShort(product.brand);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-slate-200/80",
        compact ? "h-20 w-20" : "h-24 w-24",
        className
      )}
      style={{
        background: `radial-gradient(circle at 20% 18%, ${tone.glow} 0, transparent 40%), linear-gradient(145deg, #ffffff 0%, #f5f7fb 65%, #eef2f7 100%)`,
      }}
    >
      <div className="absolute left-3 top-3 right-3 flex items-center justify-between">
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-slate-700"
          style={{ backgroundColor: tone.pill }}
        >
          {product.badge}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Tire
        </span>
      </div>

      <div
        className={cn(
          "absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-slate-900/90 shadow-[0_14px_28px_rgba(15,23,42,0.22)]",
          compact ? "h-10 w-10 border-[8px]" : "h-12 w-12"
        )}
      >
        <div className="absolute inset-[22%] rounded-full border border-white/70" />
        <div className="absolute inset-[38%] rounded-full bg-slate-200/75" />
      </div>

      <div className="absolute bottom-3 left-3 right-3">
        <p
          className={cn(
            "truncate font-semibold text-slate-900",
            compact ? "text-[0.625rem]" : "text-[0.6875rem]"
          )}
        >
          {brandShort}
        </p>
        <p className="truncate text-[0.625rem] text-slate-500">{product.spec}</p>
      </div>
    </div>
  );
}
