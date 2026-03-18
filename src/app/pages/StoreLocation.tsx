import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Search, Star } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { MOCK_STORES, MOCK_VEHICLES } from "../data/mock";

export function StoreLocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<string>(MOCK_STORES[0]?.storeId ?? "");

  const vehicleId =
    (location.state as { vehicleId?: string } | null)?.vehicleId ?? MOCK_VEHICLES[0].vehicleId;
  const currentVehicle =
    MOCK_VEHICLES.find((vehicle) => vehicle.vehicleId === vehicleId) ?? MOCK_VEHICLES[0];

  const filteredStores = useMemo(
    () =>
      MOCK_STORES.filter(
        (store) =>
          !searchQuery ||
          store.name.includes(searchQuery) ||
          store.address.includes(searchQuery)
      ),
    [searchQuery]
  );

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
            精诚服务管家
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 pt-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="输入关键字"
              className="h-14 w-full rounded-2xl border border-gray-100 bg-white pl-12 pr-4 text-gray-700 shadow-sm outline-none placeholder:text-gray-300"
              style={{ fontSize: "0.9375rem" }}
            />
          </div>

          <button className="flex items-center gap-1 text-gray-700" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
            {currentVehicle.modelName}
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
          <div className="relative h-[10.5rem] overflow-hidden bg-[#eef2f7]">
            <div className="absolute inset-0">
              <div className="absolute left-[7%] top-[10%] h-[34%] w-[32%] rounded-[18px] bg-white/45" />
              <div className="absolute right-[8%] top-[12%] h-[30%] w-[26%] rounded-[18px] bg-white/40" />
              <div className="absolute left-[14%] bottom-[14%] h-[28%] w-[24%] rounded-[18px] bg-white/40" />
              <div className="absolute right-[14%] bottom-[12%] h-[30%] w-[28%] rounded-[18px] bg-white/42" />
            </div>

            <div className="absolute left-[29%] top-0 h-full w-[6px] bg-white/60" />
            <div className="absolute left-[63%] top-0 h-full w-[6px] bg-white/60" />
            <div className="absolute inset-x-0 top-[36%] h-[6px] bg-white/70" />
            <div className="absolute inset-x-0 top-[70%] h-[6px] bg-white/70" />
            <div className="absolute left-[12%] top-[54%] h-[4px] w-[76%] rounded-full bg-[#d8e0ea]" />

            <div className="absolute left-[56%] top-[52%] h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/75 shadow-[0_0_0_12px_rgba(255,255,255,0.35)]">
              <div className="absolute inset-0 m-auto h-7 w-7 rounded-full bg-blue-500 ring-4 ring-white" />
            </div>

            <div className="absolute right-[14%] top-[16%] rounded-full bg-white/85 px-3 py-1 text-gray-500 shadow-sm">
              <span style={{ fontSize: "0.6875rem", fontWeight: 500 }}>商务区</span>
            </div>
            <div className="absolute left-[12%] bottom-[14%] rounded-full bg-white/85 px-3 py-1 text-gray-500 shadow-sm">
              <span style={{ fontSize: "0.6875rem", fontWeight: 500 }}>服务范围示意</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-4">
            <div className="flex items-center gap-2 text-gray-700" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
              <span>广东省</span>
              <span>深圳市</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {filteredStores.map((store, index) => {
            const isSelected = store.storeId === selectedStoreId;
            const nearest = index === 0;

            return (
              <button
                key={store.storeId}
                onClick={() => setSelectedStoreId(store.storeId)}
                className={`w-full rounded-[28px] border px-5 py-5 text-left transition-all ${
                  isSelected
                    ? "border-gray-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                    : "border-gray-100 bg-white shadow-[0_10px_22px_rgba(15,23,42,0.05)]"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-2">
                      <p className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 700, lineHeight: 1.45 }}>
                        {store.name}
                      </p>
                      {nearest && (
                        <span
                          className="rounded-full border border-red-200 px-2 py-0.5 text-red-500"
                          style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                        >
                          离我最近
                        </span>
                      )}
                    </div>

                    <div className="mb-2 flex items-center gap-2 text-gray-500" style={{ fontSize: "0.8125rem" }}>
                      <span>评分:</span>
                      <span className="text-yellow-500" style={{ fontWeight: 600 }}>
                        {store.rating}
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-2 text-gray-500" style={{ fontSize: "0.8125rem" }}>
                      <span>营业时间:</span>
                      <span>{store.hours}</span>
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <p className="flex-1 text-gray-500" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>
                        {store.address}
                      </p>
                      <span className="text-gray-400" style={{ fontSize: "0.9375rem" }}>
                        {store.distance}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected ? "border-gray-900" : "border-gray-300"
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full ${
                        isSelected ? "bg-gray-900" : "bg-white"
                      }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-100 bg-white/98 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="w-full rounded-[22px] bg-[#161d2c] py-3 text-white shadow-[0_12px_24px_rgba(15,23,42,0.16)] transition-colors hover:bg-[#111827]"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
}
