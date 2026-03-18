import { Bell, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showBell?: boolean;
}

export function Header({
  title = "服务",
  showBack = false,
  showBell = true,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 right-0 bg-white z-40 border-b border-gray-100">
      <div className="flex items-center justify-between h-14 px-4 max-w-md mx-auto">
        <div className="w-10">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
        <h1 className="text-gray-900" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
          {title}
        </h1>
        <div className="w-10 flex justify-end">
          {showBell && (
            <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
