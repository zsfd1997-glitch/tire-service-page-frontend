import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Check, ChevronRight, LoaderCircle, TriangleAlert, Upload } from "lucide-react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { BottomNav } from "../components/BottomNav";
import { MOCK_VEHICLES, type HealthStatus } from "../data/mock";

type InspectionResult = {
  summary: string;
  level: string;
  tone: "healthy" | "warning" | "danger";
};

const RESULT_MAP: Record<HealthStatus, InspectionResult> = {
  HEALTHY: {
    summary: "未发现明显异常磨损，建议持续观察花纹变化。",
    level: "磨损程度：轻度",
    tone: "healthy",
  },
  ROTATE: {
    summary: "检测到磨损不均，建议尽快进行轮胎换位。",
    level: "磨损程度：中度",
    tone: "warning",
  },
  REPLACE: {
    summary: "检测到明显磨损痕迹，建议尽快到店复检并更换。",
    level: "磨损程度：重度",
    tone: "danger",
  },
};

export function AiInspection() {
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const vehicle = useMemo(
    () => MOCK_VEHICLES.find((item) => item.vehicleId === id) ?? MOCK_VEHICLES[0],
    [id]
  );
  const result = RESULT_MAP[vehicle.healthStatus];

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }

    const nextUrl = URL.createObjectURL(file);
    setUploadedImage(nextUrl);
    setShowResult(false);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) {
      handleChooseFile();
      return;
    }

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsAnalyzing(false);
    setShowResult(true);
  };

  const resultToneClass =
    result.tone === "healthy"
      ? "bg-green-100 text-green-600"
      : result.tone === "warning"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="AI 磨损识别" showBack showBell={false} />

      <div className="max-w-md mx-auto p-4">
        <div className="rounded-[28px] border border-gray-100 bg-white p-4 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                AI 磨损识别
              </h2>
              <p className="mt-1 text-gray-400" style={{ fontSize: "0.75rem" }}>
                {vehicle.modelName} · {vehicle.licensePlate}
              </p>
            </div>
            <span className="text-gray-400" style={{ fontSize: "0.875rem" }}>
              对准轮胎拍摄
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            onClick={handleChooseFile}
            className="mb-4 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#f3f5f9] transition-colors hover:bg-[#edf1f7]"
          >
            {uploadedImage ? (
              <img src={uploadedImage} alt="轮胎上传照片" className="h-full w-full object-cover" />
            ) : (
              <div className="text-center text-[#a3adbf]">
                <Camera className="mx-auto mb-3 h-14 w-14" strokeWidth={1.5} />
                <p style={{ fontSize: "1rem", fontWeight: 500 }}>点击上传照片</p>
              </div>
            )}
          </button>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full rounded-full bg-blue-500 py-3 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >
            {isAnalyzing ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                识别中...
              </span>
            ) : uploadedImage ? (
              "一键拍照识别"
            ) : (
              "上传轮胎照片"
            )}
          </button>

          {showResult ? (
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${resultToneClass}`}>
                  {result.tone === "danger" ? (
                    <TriangleAlert className="h-4 w-4" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <span className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                  状态提示：{result.summary}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full ${resultToneClass}`}>
                  {result.tone === "danger" ? (
                    <TriangleAlert className="h-4 w-4" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </div>
                <span className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                  {result.level}
                </span>
              </div>
              <div className="rounded-[20px] bg-[#f5f7fb] px-4 py-3 text-gray-400" style={{ fontSize: "0.8125rem", lineHeight: 1.7 }}>
                免责声明：AI 结果仅供参考，以专业人员检测为准。光线、角度等因素可能影响识别准确性。
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-[20px] border border-dashed border-gray-200 bg-[#fafbfd] px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <Upload className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                    先上传轮胎照片，再开始识别
                  </p>
                  <p className="mt-1 text-gray-400" style={{ fontSize: "0.8125rem", lineHeight: 1.6 }}>
                    建议拍摄轮胎正面花纹区域，保持光线充足、画面清晰。未上传照片前不会展示磨损结论。
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-1 text-blue-500"
            style={{ fontSize: "0.8125rem", fontWeight: 500 }}
          >
            查看拍摄示例 <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
