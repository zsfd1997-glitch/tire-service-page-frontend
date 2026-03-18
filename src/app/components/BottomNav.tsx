import { Home, BookOpen, Calendar, ShoppingBag, ClipboardList } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { icon: Home, label: "首页", path: "/home" },
  { icon: BookOpen, label: "知识", path: "/knowledge" },
  { icon: Calendar, label: "预约", path: "/appointment" },
  { icon: ShoppingBag, label: "商城", path: "/products" },
  { icon: ClipboardList, label: "记录", path: "/records" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path === "/home" && location.pathname === "/");

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full gap-0.5"
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-blue-500" : "text-gray-400"}`}
              />
              <span
                className={isActive ? "text-blue-500" : "text-gray-400"}
                style={{ fontSize: "0.625rem", fontWeight: isActive ? 600 : 400 }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
