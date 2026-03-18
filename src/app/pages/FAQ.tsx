import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { MOCK_KNOWLEDGE, type KnowledgeItem } from "../data/mock";

type Category = "ALL" | KnowledgeItem["category"];

const TABS: { id: Category; label: string }[] = [
  { id: "ALL", label: "全部" },
  { id: "SAFETY", label: "安全知识" },
  { id: "CARE", label: "轮胎养护" },
  { id: "ROTATION", label: "轮胎换位" },
  { id: "REPLACEMENT", label: "轮胎置换" },
];

const CATEGORY_ICONS: Record<KnowledgeItem["category"], string> = {
  SAFETY: "⚠️",
  CARE: "🔧",
  ROTATION: "🔄",
  REPLACEMENT: "🛞",
};

export function FAQ() {
  const [activeTab, setActiveTab] = useState<Category>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeTab === "ALL"
      ? MOCK_KNOWLEDGE
      : MOCK_KNOWLEDGE.filter((k) => k.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="轮胎知识" showBack />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* 标签切换 */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              style={{ fontSize: "0.875rem" }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 知识列表 */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-3xl mb-2">📚</p>
            <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>暂无该分类内容</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <div key={item.id} className="p-4">
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="w-full flex items-start gap-3 text-left"
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span style={{ fontSize: "1.125rem" }}>{CATEGORY_ICONS[item.category]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900" style={{ fontWeight: 500, fontSize: "0.9375rem" }}>
                        {item.title}
                      </p>
                      {expandedId !== item.id && (
                        <p className="text-gray-400 mt-0.5 truncate" style={{ fontSize: "0.75rem" }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                    {expandedId === item.id ? (
                      <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                    )}
                  </button>

                  {expandedId === item.id && (
                    <div className="mt-3 ml-12">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-700" style={{ fontSize: "0.875rem", lineHeight: 1.75 }}>
                          {item.content}
                        </p>
                      </div>
                      <p className="text-gray-400 mt-2" style={{ fontSize: "0.75rem" }}>
                        {new Date(item.createdAt).toLocaleDateString("zh-CN")}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 服务承诺 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>服务承诺</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "🔧", label: "包安装" },
              { icon: "⚖️", label: "免费动平衡" },
              { icon: "💨", label: "免费充气" },
              { icon: "🛡️", label: "安全检查" },
              { icon: "✅", label: "正品保障" },
              { icon: "🔥", label: "质量援助" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-12 h-12 mx-auto mb-1.5 bg-yellow-50 rounded-full flex items-center justify-center border-2 border-yellow-200">
                  <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                </div>
                <p className="text-gray-600" style={{ fontSize: "0.75rem" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
