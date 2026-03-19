// 模拟数据 - 对应后端 TRD 字段规范
// vehicleId / userId / storeId / sourcePage / createdAt / updatedAt / spec / matchedSpecCode

import bydDolphinImage from "../../assets/vehicles/byd-dolphin.jpg";
import denzaN7Image from "../../assets/vehicles/denza-n7.png";
import songPlusDmiImage from "../../assets/vehicles/song-plus-dmi.jpeg";

export type HealthStatus = "HEALTHY" | "REPLACE" | "ROTATE";
export type ServiceCardStatus = "HEALTHY" | "REPLACE" | "ROTATE";
export type AppointmentMode = "PICKUP" | "SELF";
export type ModuleState = "ready" | "hidden" | "conflict" | "unavailable";

export interface Vehicle {
  vehicleId: string;
  userId: string;
  modelName: string;
  licensePlate: string;
  vin: string; // 车架号后6位
  currentMileage: number; // km
  tireSpec: string; // e.g. "245/45R19"
  matchedSpecCode: string;
  healthStatus: HealthStatus;
  healthScore: number; // 0-100
  lastReplacedMileage: number;
  maxMileage: number; // 建议更换里程
  image: string;
  color: string;
}

export interface Module {
  state: ModuleState;
  reason?: string;
}

export interface FrontendShell<T> {
  data: T;
  modules: Record<string, Module>;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  spec: string;
  matchedSpecCode: string;
  price: number;
  originalPrice: number;
  minPrice: number;
  maxPrice: number;
  features: string[];
  badge: string;
  stock: boolean;
  image: string;
  description: string;
}

export interface TireRecord {
  id: string;
  vehicleId: string;
  date: string; // ISO date
  mileage: number;
  count: number;
  type: "REPLACE" | "ROTATE" | "PATCH"; // 换胎/换位/补胎
  note?: string;
  createdAt: string;
}

export interface KnowledgeItem {
  id: string;
  category: "CARE" | "ROTATION" | "REPLACEMENT" | "SAFETY";
  title: string;
  content: string;
  thumbnail?: string;
  createdAt: string;
}

export interface Store {
  storeId: string;
  name: string;
  badge?: string;
  rating: number;
  hours: string;
  address: string;
  distance: string;
  phone: string;
}

// ===== 6辆样本车辆（对应验收包中的样本故事）=====
export const MOCK_VEHICLES: Vehicle[] = [
  {
    vehicleId: "v002",
    userId: "u001",
    modelName: "比亚迪 海豚",
    licensePlate: "粤A·D6688",
    vin: "000002",
    currentMileage: 18500,
    tireSpec: "195/60R16",
    matchedSpecCode: "SC_195_60_16",
    healthStatus: "ROTATE",
    healthScore: 61,
    lastReplacedMileage: 0,
    maxMileage: 40000,
    image: bydDolphinImage,
    color: "#F2F0E6",
  },
  {
    vehicleId: "v005",
    userId: "u001",
    modelName: "腾势 N7",
    licensePlate: "粤B·N7788",
    vin: "000005",
    currentMileage: 45000,
    tireSpec: "245/45R20",
    matchedSpecCode: "SC_245_45_20",
    healthStatus: "REPLACE",
    healthScore: 38,
    lastReplacedMileage: 8000,
    maxMileage: 60000,
    image: denzaN7Image,
    color: "#8E887E",
  },
  {
    vehicleId: "v004",
    userId: "u001",
    modelName: "宋 PLUS DM-i",
    licensePlate: "晋B·Q1688",
    vin: "000004",
    currentMileage: 8200,
    tireSpec: "235/50R19",
    matchedSpecCode: "SC_235_50_19",
    healthStatus: "HEALTHY",
    healthScore: 95,
    lastReplacedMileage: 0,
    maxMileage: 60000,
    image: songPlusDmiImage,
    color: "#FFFFFF",
  },
];

// ===== 当前选中车辆（模拟切换状态）=====
export const CURRENT_VEHICLE_ID = MOCK_VEHICLES[0]?.vehicleId ?? "";

// ===== 模块状态 FrontendShell =====
export const VEHICLE_MODULES: Record<string, Record<string, Module>> = {
  v001: {
    serviceCard: { state: "hidden", reason: "HEALTHY 不显示" },
    productStrip: { state: "ready" },
    weeklyKnowledge: { state: "ready" },
  },
  v002: {
    serviceCard: { state: "hidden", reason: "ROTATE 暂时隐藏" },
    productStrip: { state: "ready" },
    weeklyKnowledge: { state: "ready" },
  },
  v003: {
    serviceCard: { state: "ready" },
    productStrip: { state: "ready" },
    weeklyKnowledge: { state: "ready" },
  },
  v004: {
    serviceCard: { state: "hidden" },
    productStrip: { state: "ready" },
    weeklyKnowledge: { state: "ready" },
  },
  v005: {
    serviceCard: { state: "ready" },
    productStrip: { state: "ready" },
    weeklyKnowledge: { state: "ready" },
  },
  v006: {
    serviceCard: { state: "ready" },
    productStrip: { state: "conflict", reason: "AI 服务失败，不污染主线" },
    weeklyKnowledge: { state: "ready" },
  },
};

// ===== 商品数据 =====
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p001",
    brand: "马牌（Continental）",
    name: "马牌 UC7 极速系列",
    spec: "235/45R18",
    matchedSpecCode: "SC_235_45_18",
    price: 680,
    originalPrice: 850,
    minPrice: 680,
    maxPrice: 780,
    features: ["静音", "舒适", "耐磨"],
    badge: "原厂推荐",
    stock: true,
    image: "https://images.unsplash.com/photo-1765446886065-f40b0dc38b1f?w=400&h=400&fit=crop",
    description: "马牌原厂认证配套轮胎，专为比亚迪车型调校，提供卓越的静音性能与舒适驾驶体验。",
  },
  {
    id: "p002",
    brand: "米其林（Michelin）",
    name: "米其林 Pilot Sport 4",
    spec: "235/45R18",
    matchedSpecCode: "SC_235_45_18",
    price: 920,
    originalPrice: 1100,
    minPrice: 920,
    maxPrice: 1050,
    features: ["操控性佳", "高性能"],
    badge: "性价比",
    stock: true,
    image: "https://images.unsplash.com/photo-1765446886065-f40b0dc38b1f?w=400&h=400&fit=crop&sat=20",
    description: "米其林顶级运动系列，卓越的操控性与抓地力，适合追求驾驶乐趣的用户。",
  },
  {
    id: "p003",
    brand: "韩泰（Hankook）",
    name: "韩泰 Ventus S1 evo3",
    spec: "265/40R21",
    matchedSpecCode: "SC_265_40_21",
    price: 1580,
    originalPrice: 1980,
    minPrice: 1580,
    maxPrice: 1680,
    features: ["静音", "高性能", "耐磨"],
    badge: "品质款",
    stock: true,
    image: "https://images.unsplash.com/photo-1765220625875-3083a2b387c7?w=400&h=400&fit=crop",
    description: "专为高性能豪华车型设计，提供出色的高速稳定性和干湿路面抓地力。",
  },
  {
    id: "p004",
    brand: "固特异（Goodyear）",
    name: "固特异 Eagle F1",
    spec: "245/45R19",
    matchedSpecCode: "SC_245_45_19",
    price: 780,
    originalPrice: 950,
    minPrice: 780,
    maxPrice: 880,
    features: ["操控", "耐磨"],
    badge: "品质款",
    stock: true,
    image: "https://images.unsplash.com/photo-1765446886065-f40b0dc38b1f?w=400&h=400&fit=crop&hue=30",
    description: "固特异旗舰系列，卓越的操控性与耐磨性，为中大型轿车提供最佳驾驶体验。",
  },
  {
    id: "p005",
    brand: "米其林（Michelin）",
    name: "米其林 e·PRIMACY",
    spec: "195/60R16",
    matchedSpecCode: "SC_195_60_16",
    price: 1599,
    originalPrice: 1799,
    minPrice: 1599,
    maxPrice: 1699,
    features: ["静音", "舒适", "节能"],
    badge: "适配",
    stock: true,
    image: "https://images.unsplash.com/photo-1765446886065-f40b0dc38b1f?w=400&h=400&fit=crop&sat=15",
    description: "e·PRIMACY 静音舒适",
  },
  {
    id: "p006",
    brand: "马牌（Continental）",
    name: "马牌 UltraContact UC6",
    spec: "195/60R16",
    matchedSpecCode: "SC_195_60_16",
    price: 1299,
    originalPrice: 1499,
    minPrice: 1299,
    maxPrice: 1399,
    features: ["湿地抓地", "静音", "耐磨"],
    badge: "适配",
    stock: true,
    image: "https://images.unsplash.com/photo-1765446886065-f40b0dc38b1f?w=400&h=400&fit=crop&hue=25",
    description: "UltraContact UC6",
  },
  {
    id: "p007",
    brand: "倍耐力（Pirelli）",
    name: "倍耐力 P ZERO",
    spec: "245/45R20",
    matchedSpecCode: "SC_245_45_20",
    price: 1899,
    originalPrice: 2099,
    minPrice: 1899,
    maxPrice: 1999,
    features: ["操控", "高性能", "抓地力"],
    badge: "适配",
    stock: true,
    image: "https://images.unsplash.com/photo-1765220625875-3083a2b387c7?w=400&h=400&fit=crop&sat=5",
    description: "P ZERO 运动操控",
  },
  {
    id: "p008",
    brand: "马牌（Continental）",
    name: "马牌 PremiumContact 6",
    spec: "245/45R20",
    matchedSpecCode: "SC_245_45_20",
    price: 1699,
    originalPrice: 1899,
    minPrice: 1699,
    maxPrice: 1799,
    features: ["舒适", "抓地力", "静音"],
    badge: "适配",
    stock: true,
    image: "https://images.unsplash.com/photo-1765446886065-f40b0dc38b1f?w=400&h=400&fit=crop&sat=-5",
    description: "PremiumContact 6",
  },
  {
    id: "p009",
    brand: "韩泰（Hankook）",
    name: "韩泰 Ventus Prime 4",
    spec: "235/50R19",
    matchedSpecCode: "SC_235_50_19",
    price: 1499,
    originalPrice: 1699,
    minPrice: 1499,
    maxPrice: 1599,
    features: ["静音", "舒适", "耐磨"],
    badge: "适配",
    stock: true,
    image: "https://images.unsplash.com/photo-1765220625875-3083a2b387c7?w=400&h=400&fit=crop&hue=20",
    description: "Ventus Prime 4",
  },
  {
    id: "p010",
    brand: "米其林（Michelin）",
    name: "米其林 Primacy SUV+",
    spec: "235/50R19",
    matchedSpecCode: "SC_235_50_19",
    price: 1599,
    originalPrice: 1799,
    minPrice: 1599,
    maxPrice: 1699,
    features: ["SUV", "静音", "湿地制动"],
    badge: "适配",
    stock: true,
    image: "https://images.unsplash.com/photo-1765446886065-f40b0dc38b1f?w=400&h=400&fit=crop&hue=10",
    description: "Primacy SUV+",
  },
];

// ===== 换胎记录 =====
export const MOCK_RECORDS: TireRecord[] = [
  {
    id: "r001",
    vehicleId: "v001",
    date: "2024-06-15",
    mileage: 25000,
    count: 4,
    type: "REPLACE",
    note: "全车更换马牌原厂轮胎",
    createdAt: "2024-06-15T10:00:00Z",
  },
  {
    id: "r002",
    vehicleId: "v001",
    date: "2024-01-08",
    mileage: 15000,
    count: 4,
    type: "ROTATE",
    note: "前后轮换位",
    createdAt: "2024-01-08T09:30:00Z",
  },
  {
    id: "r003",
    vehicleId: "v005",
    date: "2024-09-20",
    mileage: 38000,
    count: 2,
    type: "REPLACE",
    note: "更换前轮米其林轮胎",
    createdAt: "2024-09-20T14:00:00Z",
  },
  {
    id: "r004",
    vehicleId: "v006",
    date: "2024-11-05",
    mileage: 50000,
    count: 1,
    type: "PATCH",
    note: "右后轮补胎",
    createdAt: "2024-11-05T11:00:00Z",
  },
];

// ===== 知识内容 =====
export const MOCK_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "k001",
    category: "SAFETY",
    title: "磨损轮胎的安全隐患",
    content:
      "轮胎磨损直接影响行车安全。当花纹深度低于 1.6mm 时，轮胎已达到法律规定的最低标准，必须更换。建议花纹深度低于 3mm 时即进行更换，以保证制动距离和防水排水性能。",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "k002",
    category: "SAFETY",
    title: "轮胎鼓包的危险性",
    content:
      "轮胎鼓包是轮胎内部帘布层断裂的外在表现，极易发生爆胎事故。一旦发现鼓包，应立即更换备胎，不得继续高速行驶，尽快前往门店进行专业检查和更换。",
    createdAt: "2025-01-02T00:00:00Z",
  },
  {
    id: "k003",
    category: "CARE",
    title: "原厂轮胎的优势",
    content:
      "原厂配套轮胎经过整车标定调校，在降噪、操控、续航等方面与整车高度匹配。使用原厂规格轮胎，能够保证驾驶体验的一致性，同时维护整车保修权益。",
    createdAt: "2025-01-03T00:00:00Z",
  },
  {
    id: "k004",
    category: "CARE",
    title: "如何正确检查胎压",
    content:
      "建议每月至少检查一次胎压，并在气温变化明显的季节前后各检查一次。检查时应在轮胎冷车状态（行驶前或停车3小时以上）下进行，参考车辆B柱标签或说明书上的标准胎压值。",
    createdAt: "2025-01-04T00:00:00Z",
  },
  {
    id: "k005",
    category: "ROTATION",
    title: "轮胎换位的必要性",
    content:
      "由于前后轮承受的重量和转向磨损不同，建议每行驶 10,000-15,000km 进行一次轮胎换位。换位可以使四条轮胎磨损更均匀，延长整套轮胎的使用寿命。",
    createdAt: "2025-01-05T00:00:00Z",
  },
  {
    id: "k006",
    category: "ROTATION",
    title: "换位方式选择",
    content:
      "常见的换位方式有交叉换位（X型）和前后换位（直线型）。有方向性花纹的轮胎只能前后换位，不可交叉。换位后务必重新校准四轮定位和动平衡，确保安全。",
    createdAt: "2025-01-06T00:00:00Z",
  },
  {
    id: "k007",
    category: "REPLACEMENT",
    title: "判断轮胎是否需要更换",
    content:
      "以下情况需要立即更换：花纹深度低于 1.6mm、出现明显鼓包或裂缝、轮胎使用超过 6 年（无论磨损程度）、行驶里程超过 6-8 万公里。",
    createdAt: "2025-01-07T00:00:00Z",
  },
  {
    id: "k008",
    category: "REPLACEMENT",
    title: "更换轮胎的正确步骤",
    content:
      "更换轮胎时应四条同时更换或至少同轴同时更换，避免单独更换一条导致前后或左右抓地力不均。新轮胎安装后需进行动平衡校正，并在前 500km 内适当磨合，避免激烈驾驶。",
    createdAt: "2025-01-08T00:00:00Z",
  },
];

// ===== 门店数据 =====
export const MOCK_STORES: Store[] = [
  {
    storeId: "s001",
    name: "比亚迪汽车王朝网（深圳南山授权服务店）",
    badge: "距离最近",
    rating: 4.9,
    hours: "09:00 - 18:00",
    address: "广东省深圳市南山区科技南路18号",
    distance: "0.8km",
    phone: "0755-88888888",
  },
  {
    storeId: "s002",
    name: "比亚迪海洋网（深圳福田旗舰服务中心）",
    rating: 4.7,
    hours: "08:30 - 18:30",
    address: "广东省深圳市福田区车公庙汽车城B区",
    distance: "2.3km",
    phone: "0755-77777777",
  },
  {
    storeId: "s003",
    name: "比亚迪汽车王朝网（深圳宝安店）",
    rating: 4.6,
    hours: "09:00 - 17:30",
    address: "广东省深圳市宝安区宝安大道汽车一条街",
    distance: "5.1km",
    phone: "0755-66666666",
  },
];

// ===== 健康度标签 =====
export const HEALTH_LABELS: Record<HealthStatus, { label: string; color: string; bgColor: string; desc: string }> = {
  HEALTHY: {
    label: "状态良好",
    color: "text-green-600",
    bgColor: "bg-green-50",
    desc: "轮胎状态正常",
  },
  ROTATE: {
    label: "建议换位",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    desc: "轮胎磨损不均，建议进行换位",
  },
  REPLACE: {
    label: "建议更换",
    color: "text-red-600",
    bgColor: "bg-red-50",
    desc: "轮胎磨损严重，建议尽快更换",
  },
};

// ===== 记录类型标签 =====
export const RECORD_TYPE_LABELS: Record<TireRecord["type"], string> = {
  REPLACE: "换胎",
  ROTATE: "换位",
  PATCH: "补胎",
};
