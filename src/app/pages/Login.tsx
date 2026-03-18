import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!username.trim()) {
      setError("请输入账号");
      return;
    }
    if (!password.trim()) {
      setError("请输入密码");
      return;
    }

    setLoading(true);
    setError("");

    // 模拟 POST /api/auth/login
    await new Promise((r) => setTimeout(r, 800));

    if (username === "admin" && password === "123456") {
      // 存储 token（实际项目应替换为真实 token）
      localStorage.setItem("token", "mock_token_admin_001");
      localStorage.setItem("userId", "u001");
      navigate("/home");
    } else {
      setError("账号或密码错误，请重试");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
      {/* 顶部品牌区 */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🛞</span>
          </div>
          <div>
            <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              轮胎助手
            </h1>
            <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>TireBot · 让每次出行更安心</p>
          </div>
        </div>

        {/* 装饰图 */}
        <div className="w-full max-w-xs aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1765220625875-3083a2b387c7?w=600&h=338&fit=crop"
            alt="轮胎"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* 登录表单 */}
        <div className="w-full max-w-xs space-y-4">
          {/* 账号 */}
          <div>
            <label className="text-gray-400 mb-1 block" style={{ fontSize: "0.75rem" }}>
              账号
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入账号"
              className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
            />
          </div>

          {/* 密码 */}
          <div>
            <label className="text-gray-400 mb-1 block" style={{ fontSize: "0.75rem" }}>
              密码
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full bg-white/10 text-white placeholder-gray-500 border border-white/20 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-400/10 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span style={{ fontSize: "0.875rem" }}>{error}</span>
            </div>
          )}

          {/* 登录按钮 */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white py-3.5 rounded-xl font-medium transition-all shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>登录中...</span>
              </div>
            ) : (
              "一键登录"
            )}
          </button>

          <p className="text-center text-gray-500" style={{ fontSize: "0.75rem" }}>
            演示账号：admin / 123456
          </p>
        </div>
      </div>

      {/* 底部说明 */}
      <div className="px-8 pb-8 text-center">
        <p className="text-gray-600" style={{ fontSize: "0.75rem" }}>
          登录即代表您同意《用户协议》及《隐私政策》
        </p>
      </div>
    </div>
  );
}
