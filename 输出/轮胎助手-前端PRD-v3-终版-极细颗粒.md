# 轮胎助手前端 PRD v3 终版 极细颗粒

## 0. 文档声明
- 文档角色: 当前前端实现的超细颗粒 PRD / 设计-研发-联调一体化交付底稿
- 文档来源: 基于当前仓库前端实现、页面约束包、验收包反推整理
- 文档目标: 任何新接手的人或 AI coding agent，在不看聊天上下文的情况下，也能用这份文档继续做页面开发、状态补齐、接口替换和验收
- 版本关系:
  - v1: 建立全局范围和页面骨架
  - v2: 细化页面结构、状态、交互
  - v3: 在 v2 基础上继续优化结构并下钻到更细颗粒的需求 ID、文案、组件职责、跳转、状态矩阵、验收矩阵

---

## 1. 产品总述
### 1.1 产品名称
- 中文名: 轮胎助手
- 英文辅助名: TireBot / Tire Service Page

### 1.2 产品定位
这是一个面向单用户车主的移动优先轮胎服务前端，用于完成以下闭环:
1. 登录系统
2. 查看车辆和轮胎状态
3. 查看推荐商品或知识
4. 提交服务预约
5. 维护个人轮胎历史记录

### 1.3 核心价值
- 降低用户理解轮胎状态的门槛
- 提供从状态到处理动作的清晰路径
- 让“看状态”和“去预约”之间不需要跳出系统

### 1.4 非目标
- 不做订单支付
- 不做后台管理
- 不做真正 AI 推理闭环
- 不做地图真实定位
- 不做复杂车辆管理系统

---

## 2. 目标用户与 JTBD
### 2.1 用户画像
- 已有车辆的普通车主
- 更关心“现在要不要处理”而不是专业轮胎参数
- 可接受移动端卡片式信息结构
- 希望快速完成预约或了解推荐商品

### 2.2 JTBD
- 当我打开应用时，我希望一眼知道我的轮胎是否有问题，这样我能决定是否需要预约处理
- 当我想更换轮胎时，我希望系统直接给我匹配规格，这样我不需要自己理解复杂参数
- 当我准备去店里处理时，我希望只用最少点击就完成预约
- 当我过去换过轮胎时，我希望记录能被保存，这样以后提醒逻辑能更准确

### 2.3 主要成功指标（前端体验视角）
- 用户在首页 5 秒内理解当前车辆状态
- 用户在 3 次以内点击进入预约页
- 用户在商品页无需额外搜索即可看到与车辆规格匹配的商品
- 用户能在记录页完成“新增 + 查看 + 删除”至少一个闭环

---

## 3. 技术与实现边界
### 3.1 当前技术栈
- React 18.3.1
- React Router 7
- Vite 6
- Tailwind CSS 4 风格 class
- Lucide React 图标
- 本地 mock 数据驱动

### 3.2 当前实现事实
- 当前前端总代码规模约 3477 行
- 页面文件 11 个
- 核心共享组件:
  - `Header`
  - `BottomNav`
  - `SectionCard`
  - `ProductVisual`
- 核心数据真源文件:
  - `src/app/data/mock.ts`

### 3.3 数据契约边界
必须保持以下字段口径，不允许私自发明平行字段:
- `vehicleId`
- `userId`
- `storeId`
- `sourcePage`
- `createdAt`
- `updatedAt`
- `spec`
- `matchedSpecCode`

### 3.4 模块状态边界
聚合模块必须支持:
- `ready`
- `hidden`
- `conflict`
- `unavailable`

---

## 4. 信息架构
### 4.1 一级导航
| 导航项 | 路由 | 角色 |
|---|---|---|
| 首页 | `/home` | 总览与决策 |
| 知识 | `/knowledge` | 教育内容 |
| 预约 | `/appointment` | 服务提交 |
| 商城 | `/products` | 商品浏览 |
| 记录 | `/records` | 维护历史记录 |

### 4.2 二级功能页
| 页面 | 路由 | 来源 |
|---|---|---|
| 登录 | `/login` | 启动入口 |
| 车辆详情 | `/vehicle/:id` | 首页延展 |
| AI 识别 | `/ai-inspection/:id` | 首页/车辆详情 |
| 轮胎规格选择 | `/tire-spec/:id` | 首页健康卡 |
| 商品详情 | `/products/:id` | 首页推荐/商品列表 |
| 门店选择 | `/store-location` | 首页管家入口 |

### 4.3 路由别名
| 别名 | 目标 |
|---|---|
| `/tire-shop` | `/products` |
| `/tire/:id` | `/products` |
| `/service-booking` | `/appointment` |
| `/tire-record` | `/records` |
| `/faq` | `/knowledge` |
| `/tire-health` | `/home` |

---

## 5. 全局设计与交互规范
### 5.1 页面框架
- 移动端优先
- 页面主体宽度控制在 `max-w-md`
- 主内容多数使用白底圆角卡片
- Header 顶部固定
- BottomNav 底部固定

### 5.2 颜色规则
- 蓝色:
  - 品牌主色
  - AI 入口
  - 激活态导航
  - 操作型强调
- 绿色:
  - `HEALTHY`
  - 成功预约
  - 库存/适配等积极状态
- 黄色:
  - `ROTATE`
  - 提醒类信息
- 红色:
  - `REPLACE`
  - 错误提示
  - 券后价格强调

### 5.3 文案风格
- 功能性优先
- 避免营销夸张腔
- 句子尽量短
- 在用户做动作前给明确结果预期

### 5.4 路由切换规则
- 所有页面路径变化后自动滚到顶部
- 回退按钮统一走 `navigate(-1)`

---

## 6. 数据模型字典

### 6.1 Vehicle
| 字段 | 类型 | 含义 | 前端用途 |
|---|---|---|---|
| `vehicleId` | string | 车辆 ID | 路由与状态绑定 |
| `userId` | string | 所属用户 | 数据归属 |
| `modelName` | string | 车型名 | 页面主标题 |
| `licensePlate` | string | 车牌号 | 识别与展示 |
| `vin` | string | 车架号后 6 位 | 身份辅助信息 |
| `currentMileage` | number | 当前里程 | 健康分析 |
| `tireSpec` | string | 当前轮胎规格 | 商品匹配、规格展示 |
| `matchedSpecCode` | string | 匹配编码 | 商品推荐过滤 |
| `healthStatus` | enum | 状态值 | 颜色、标签、服务卡 |
| `healthScore` | number | 健康分 | 圆环和数字展示 |
| `lastReplacedMileage` | number | 上次换胎里程 | 计算使用里程 |
| `maxMileage` | number | 建议更换里程 | 进度条分母 |
| `image` | string | 图片地址 | 车辆卡片视觉 |
| `color` | string | 颜色标识 | 备用视觉属性 |

### 6.2 Product
| 字段 | 含义 |
|---|---|
| `id` | 商品唯一标识 |
| `brand` | 品牌名 |
| `name` | 商品名 |
| `spec` | 商品规格 |
| `matchedSpecCode` | 与车辆匹配的规格编码 |
| `price` | 当前价格 |
| `originalPrice` | 划线价 |
| `minPrice` / `maxPrice` | 价格区间预留 |
| `features` | 卖点列表 |
| `badge` | 商品标签 |
| `stock` | 是否有货 |
| `image` | 商品图 |
| `description` | 描述文案 |

### 6.3 TireRecord
| 字段 | 含义 |
|---|---|
| `id` | 记录 ID |
| `vehicleId` | 关联车辆 |
| `date` | 换胎日期 |
| `mileage` | 换胎里程 |
| `count` | 换胎数量 |
| `type` | 记录类型 |
| `note` | 备注 |
| `createdAt` | 创建时间 |

### 6.4 KnowledgeItem
| 字段 | 含义 |
|---|---|
| `id` | 知识条目 ID |
| `category` | 分类 |
| `title` | 标题 |
| `content` | 内容 |
| `thumbnail` | 缩略图（当前未用） |
| `createdAt` | 创建时间 |

### 6.5 Store
| 字段 | 含义 |
|---|---|
| `storeId` | 门店 ID |
| `name` | 门店名 |
| `badge` | 门店标签 |
| `rating` | 评分 |
| `hours` | 营业时间 |
| `address` | 地址 |
| `distance` | 距离 |
| `phone` | 电话 |

### 6.6 Module
| 字段 | 含义 |
|---|---|
| `state` | 模块状态 |
| `reason` | 状态原因说明 |

---

## 7. 全局状态与事件规范
### 7.1 必须支持的页面状态
- `loading`
- `success`
- `empty`
- `error`
- `hidden`
- `conflict`
- `unavailable`

### 7.2 当前已实现状态覆盖情况
| 页面 | loading | success | empty | error | hidden/conflict |
|---|---|---|---|---|---|
| 登录 | 已实现 | 已实现 | 不适用 | 已实现 | 不适用 |
| 首页 | 未显式实现 skeleton | 已实现 | 无车空态未实现 | 接口错误未实现 | 部分实现 |
| 车辆详情 | 未显式实现 | 已实现 | 不适用 | 未实现 | 已实现 |
| AI 识别 | 已实现 | 已实现 | 通过“未上传图片”替代 | 未实现 | 不适用 |
| 规格选择 | 已实现默认态 | 已实现 | 不适用 | 未实现 | 不适用 |
| 商品列表 | 未显式实现 | 已实现 | 已实现 | 未实现 | 部分实现 |
| 商品详情 | 未显式实现 | 已实现 | 回退到首商品 | 未实现 | 未实现 |
| 预约 | 已实现 | 已实现 | 不适用 | 未实现 | 不适用 |
| 记录 | 已实现默认态 | 已实现 | 空记录未独立实现 | 未实现 | 不适用 |
| 知识 | 已实现默认态 | 已实现 | 已实现 | 未实现 | 不适用 |
| 门店 | 已实现默认态 | 已实现 | 未实现 | 未实现 | 不适用 |

### 7.3 需要后续补齐的状态缺口
- 首页无车空态
- 首页接口失败态
- 商品列表接口失败态
- 商品详情真实不存在态
- 预约失败态
- 记录页空态
- 门店页空搜索结果态

---

## 8. 页面超细颗粒需求

## 8.1 登录页 `/login`
### 8.1.1 页面目标
- 让用户用演示账号尽快进入应用

### 8.1.2 组件树
- `LoginPage`
  - 品牌区
    - Logo 图标
    - 标题“轮胎助手”
    - 副标题“TireBot · 让每次出行更安心”
  - 装饰图
  - 表单区
    - 账号 label
    - 账号 input
    - 密码 label
    - 密码 input
    - 密码显示切换按钮
    - 错误提示条
    - 登录按钮
    - 演示账号说明
  - 页脚协议说明

### 8.1.3 本地状态
| 状态名 | 默认值 | 说明 |
|---|---|---|
| `username` | `admin` | 账号 |
| `password` | `123456` | 密码 |
| `showPassword` | `false` | 是否明文 |
| `loading` | `false` | 是否提交中 |
| `error` | `""` | 错误文案 |

### 8.1.4 原子需求
- LOG-001: 页面首屏必须预填账号 `admin`
- LOG-002: 页面首屏必须预填密码 `123456`
- LOG-003: 账号输入框 placeholder 为“请输入账号”
- LOG-004: 密码输入框 placeholder 为“请输入密码”
- LOG-005: 点击眼睛按钮可在密码明文/密文间切换
- LOG-006: 账号去空格后为空时，设置 `error=请输入账号`
- LOG-007: 密码去空格后为空时，设置 `error=请输入密码`
- LOG-008: 点击登录按钮时先清空旧错误，再进入 `loading`
- LOG-009: 登录模拟耗时为 800ms
- LOG-010: 凭证正确时写入 `localStorage.token`
- LOG-011: 凭证正确时写入 `localStorage.userId`
- LOG-012: 凭证正确时跳转 `/home`
- LOG-013: 凭证错误时提示“账号或密码错误，请重试”
- LOG-014: 凭证错误时退出 `loading`
- LOG-015: 回车键触发与按钮点击相同的登录逻辑

### 8.1.5 验收
- 输入默认账号密码后，用户不改任何字段，点击一次即可进首页
- 错误账号时，不跳转首页

---

## 8.2 首页 `/home`
### 8.2.1 页面目标
- 用一屏卡片展示当前车、健康状态、知识和推荐动作

### 8.2.2 组件树
- `HomePage`
  - `Header`
  - `VehicleSwitcherCard`
    - 车辆图
    - 左右切换箭头
    - 车辆信息叠层
    - 指示点组
  - `HealthCard`
    - 标题
    - 状态标签
    - 换胎记录入口
    - 规格入口
    - 状态说明
    - 里程进度条
    - 健康分圆环
    - 预约按钮
  - `KnowledgeStrip`
  - `ButlerEntry`
  - `AiInspectionEntry`
  - `ProductStrip`
  - `BottomNav`

### 8.2.3 输入数据
- `MOCK_VEHICLES`
- `MOCK_PRODUCTS`
- `MOCK_KNOWLEDGE`
- `VEHICLE_MODULES`
- `HEALTH_LABELS`

### 8.2.4 本地状态
| 状态名 | 默认值 | 说明 |
|---|---|---|
| `currentVehicleIndex` | `0` | 当前车辆索引 |

### 8.2.5 派生数据
| 变量 | 计算公式 |
|---|---|
| `currentVehicle` | `MOCK_VEHICLES[currentVehicleIndex]` |
| `modules` | `VEHICLE_MODULES[currentVehicle.vehicleId] || {}` |
| `healthInfo` | `HEALTH_LABELS[currentVehicle.healthStatus]` |
| `recommendedProducts` | `MOCK_PRODUCTS.filter(matchedSpecCode===当前车).slice(0,2)` |
| `weeklyKnowledge` | `MOCK_KNOWLEDGE.slice(0,3)` |
| `mileDone` | `currentMileage - lastReplacedMileage` |
| `milePercent` | `min(100, round(mileDone/maxMileage*100))` |

### 8.2.6 原子需求
- HOME-001: Header 左侧显示应用图标和“轮胎助手”
- HOME-002: Header 右侧显示铃铛和红点
- HOME-003: 车辆卡顶部展示当前车辆图片
- HOME-004: 点击左箭头时索引循环减 1
- HOME-005: 点击右箭头时索引循环加 1
- HOME-006: 点击任一指示点时直接切换车辆
- HOME-007: 车辆卡底部展示 `modelName`
- HOME-008: 车辆卡底部展示 `licensePlate`
- HOME-009: 健康卡标题固定为“轮胎健康度”
- HOME-010: 健康状态标签使用 `HEALTH_LABELS.label`
- HOME-011: 健康状态文案使用 `HEALTH_LABELS.desc`
- HOME-012: 点击“添加换胎记录”跳 `/records`
- HOME-013: 跳转记录页时通过 `location.state.vehicleId` 传当前车 ID
- HOME-014: 点击规格按钮跳 `/tire-spec/:id`
- HOME-015: 规格区右侧必须展示 `currentVehicle.tireSpec`
- HOME-016: 已使用里程显示为 `mileDone/maxMileage`
- HOME-017: 健康进度条颜色依赖 `healthStatus`
- HOME-018: 圆环中心显示 `healthScore`
- HOME-019: 点击“一键预约”跳 `/appointment`
- HOME-020: 预约跳转需携带 `vehicleId` 和 `source=home-health-card`
- HOME-021: 若 `weeklyKnowledge.state!==hidden` 才显示知识模块
- HOME-022: 知识区固定展示最新 3 条知识
- HOME-023: 点击“更多”跳 `/knowledge`
- HOME-024: 点击单条知识也跳 `/knowledge`
- HOME-025: 管家卡点击“一键咨询”跳 `/store-location`
- HOME-026: 跳门店页需携带 `vehicleId`
- HOME-027: AI 识别卡点击跳 `/ai-inspection/:vehicleId`
- HOME-028: 若 `productStrip.state===conflict` 则显示冲突提示
- HOME-029: 推荐商品仅展示与 `matchedSpecCode` 相同的前 2 个商品
- HOME-030: 点击商品卡跳 `/products/:id`
- HOME-031: 商品卡右上角必须显示“适配”标签
- HOME-032: 商品卡价格区必须显示券后价与原价
- HOME-033: 点击“一键购买”跳 `/products`

### 8.2.7 页面缺口
- HOME-GAP-001: 未实现 loading skeleton
- HOME-GAP-002: 未实现无车空态
- HOME-GAP-003: 未实现接口错误态

### 8.2.8 验收
- 用户能切换 3 台车
- 用户能看到对应规格与推荐商品变化
- 用户能直接进入预约、商品、知识、门店、AI、记录页

---

## 8.3 车辆详情页 `/vehicle/:id`
### 8.3.1 页面目标
- 给单台车一个更明确的健康与处理说明

### 8.3.2 本地状态
| 状态名 | 默认值 | 说明 |
|---|---|---|
| `activeTab` | `health` | 当前标签 |
| `ackDone` | `false` | 是否确认稍后处理 |

### 8.3.3 派生逻辑
- `vehicle` 按 URL `id` 查询，不存在则回退第一台车
- `showServiceCard` 由三条件共同决定:
  - `healthStatus !== HEALTHY`
  - `modules.serviceCard.state === ready`
  - `ackDone === false`

### 8.3.4 原子需求
- VEH-001: 页面标题为“车辆详情”
- VEH-002: 默认标签为“轮胎健康度”
- VEH-003: 点击“轮胎更换”切换到更换标签
- VEH-004: 顶部车辆信息区展示图片、车型、车牌、VIN 后 6 位、当前里程、规格
- VEH-005: 健康标签使用 `HEALTH_LABELS.label`
- VEH-006: 当 `showServiceCard=true` 时显示服务提醒卡
- VEH-007: `REPLACE` 服务卡文案为“强烈建议更换轮胎”
- VEH-008: `ROTATE` 服务卡文案为“建议进行轮胎换位”
- VEH-009: 点击“稍后处理”后服务卡在当前会话隐藏
- VEH-010: 健康标签页中显示健康分圆环
- VEH-011: 健康标签页中显示里程进度条
- VEH-012: 健康标签页中展示 `healthInfo.desc`
- VEH-013: 点击“一键预约”跳预约页
- VEH-014: 点击 AI 卡跳 AI 识别页
- VEH-015: 更换标签页展示匹配商品前 2 条
- VEH-016: 更换标签页商品卡点击跳商品详情

---

## 8.4 AI 识别页 `/ai-inspection/:id`
### 8.4.1 页面目标
- 模拟“上传轮胎图片 -> AI 识别 -> 输出结论”的流程

### 8.4.2 本地状态
- `uploadedImage`
- `isAnalyzing`
- `showResult`

### 8.4.3 结果映射
| healthStatus | summary | level | tone |
|---|---|---|---|
| `HEALTHY` | 未发现明显异常磨损，建议持续观察花纹变化。 | 磨损程度：轻度 | healthy |
| `ROTATE` | 检测到磨损不均，建议尽快进行轮胎换位。 | 磨损程度：中度 | warning |
| `REPLACE` | 检测到明显磨损痕迹，建议尽快到店复检并更换。 | 磨损程度：重度 | danger |

### 8.4.4 原子需求
- AI-001: 标题为“AI 磨损识别”
- AI-002: 页面副标题展示车型 + 车牌
- AI-003: 点击图片区打开文件选择
- AI-004: 选择图片后应替换占位内容为用户图片
- AI-005: 未上传图片前点击主按钮，应先触发文件选择
- AI-006: 已上传图片后点击主按钮进入识别态
- AI-007: 识别态时按钮文案为“识别中...”
- AI-008: 模拟识别耗时 900ms
- AI-009: 识别完成后展示 2 条结果
- AI-010: 结果区固定展示免责声明

---

## 8.5 规格选择页 `/tire-spec/:id`
### 8.5.1 页面目标
- 让用户理解规格组成，并通过滚轮选择宽度/扁平比/轮毂尺寸

### 8.5.2 本地状态
- `width`
- `aspect`
- `rim`
- `isPickerOpen`

### 8.5.3 原子需求
- SPEC-001: 进入页面时，先用 `parseSpec` 解析车辆默认规格
- SPEC-002: 标题当前为“服务”（建议后续改为“轮胎规格”）
- SPEC-003: 页面上半区展示车型名与引导语
- SPEC-004: 点击规格区域打开 picker 遮罩
- SPEC-005: picker 打开时底部弹层出现
- SPEC-006: 三列滚轮分别代表宽度/扁平比/轮毂
- SPEC-007: 滚动结束后自动吸附到最近值
- SPEC-008: 顶部实时拼接完整规格字符串
- SPEC-009: 页面下半部分需展示 3 个 FAQ 说明块
- SPEC-010: 点击遮罩背景关闭 picker

---

## 8.6 商品列表页 `/products`
### 8.6.1 页面目标
- 让用户按规格浏览商品，并明确知道哪些商品与当前车辆匹配

### 8.6.2 本地状态
- `filterSpec`
- `favorites`

### 8.6.3 原子需求
- SHOP-001: 页面标题为“轮胎智能购”
- SHOP-002: 顶部当前车辆卡展示 `modelName` 与 `tireSpec`
- SHOP-003: 顶部“切换车辆”当前仅为视觉按钮，无实际切车逻辑
- SHOP-004: 服务亮点区固定为四项
- SHOP-005: 规格筛选默认“全部规格”
- SHOP-006: 点击规格标签后，只展示对应规格商品
- SHOP-007: 若筛选结果为空，展示“暂无该规格商品”
- SHOP-008: 商品卡点击主体跳商品详情
- SHOP-009: 点击心形收藏按钮时，不跳详情
- SHOP-010: 收藏状态仅存在本地 `Set`
- SHOP-011: 商品卡价格区显示当前价 + 原价
- SHOP-012: 商品卡右侧显示库存状态
- SHOP-013: 规格与当前车辆一致时显示“适配您的车”

---

## 8.7 商品详情页 `/products/:id`
### 8.7.1 页面目标
- 让用户在单商品详情页完成“确认适配性 -> 理解卖点 -> 去预约”

### 8.7.2 原子需求
- DETAIL-001: 标题为“轮胎详情”
- DETAIL-002: 若 URL 商品不存在，则回退到第一条商品
- DETAIL-003: 顶部 Hero 区展示商品视觉、规格 badge、商品 badge
- DETAIL-004: 顶部促销条展示折扣比例与活动截止日期
- DETAIL-005: 基础信息卡展示规格、badge、适配状态、品牌、商品名
- DETAIL-006: 价格区展示主价格、划线价、省多少钱
- DETAIL-007: 当前车辆提示区展示车型、规格、匹配结果
- DETAIL-008: 展示商品描述
- DETAIL-009: 展示安装说明和到货时效
- DETAIL-010: 展示快捷服务说明块
- DETAIL-011: 展示“正品保障”跳转项
- DETAIL-012: 展示 2 条用户评价
- DETAIL-013: 底部固定 CTA 为“立即预约安装”

---

## 8.8 预约页 `/appointment`
### 8.8.1 页面目标
- 让用户在两种服务模式中二选一并完成预约提交

### 8.8.2 本地状态
- `mode`
- `submitState`

### 8.8.3 页面阶段
| 阶段 | 说明 |
|---|---|
| `idle` | 表单选择态 |
| `loading` | 提交中 |
| `success` | 成功结果页 |

### 8.8.4 原子需求
- BOOK-001: 默认 `mode = PICKUP`
- BOOK-002: 默认 `submitState = idle`
- BOOK-003: 当前车辆来源于 `location.state.vehicleId`
- BOOK-004: 未传车辆时回退到第一台车
- BOOK-005: 页面头部标题为“服务预约”
- BOOK-006: 页面展示当前车辆卡
- BOOK-007: 提供两个模式卡片
- BOOK-008: 当前选中的模式卡显示蓝色边框与勾选态
- BOOK-009: 点击“下一步”进入 `loading`
- BOOK-010: 模拟提交耗时 800ms
- BOOK-011: 提交完成进入 `success`
- BOOK-012: 成功页标题为“预约结果”
- BOOK-013: 成功页主文案为“预约成功！”
- BOOK-014: 成功页展示车辆、车牌、服务方式三行摘要
- BOOK-015: 成功页可“返回首页”
- BOOK-016: 成功页可“再次预约”

---

## 8.9 记录页 `/records`
### 8.9.1 页面目标
- 记录非官方门店换胎行为，为后续提醒优化提供补充信息

### 8.9.2 本地状态
- `records`
- `selectedYear`
- `selectedMonth`
- `mileageWan`
- `mileageQian`
- `formCount`
- `activeSheet`

### 8.9.3 派生值
- `formDate = yyyy-mm`
- `mileageValue = mileageWan * 10000 + mileageQian * 1000`
- `formComplete = Boolean(formDate && mileageValue)`

### 8.9.4 原子需求
- REC-001: 顶部说明区必须明确“仅记录非官方授权服务店记录”
- REC-002: 标题区显示“添加换胎记录”
- REC-003: 点击换胎时间字段打开日期滚轮
- REC-004: 点击换胎里程字段打开里程滚轮
- REC-005: 数量有且仅有 1/2/3/4 条
- REC-006: 点击数量按钮切换选中态
- REC-007: 表单满足后点击提交，新记录插入列表顶部
- REC-008: 新记录 `id` 由 `record_${Date.now()}` 生成
- REC-009: 新记录类型固定为 `REPLACE`
- REC-010: 历史记录卡展示时间、里程、数量
- REC-011: 点击删除后即时从本地列表移除

---

## 8.10 知识页 `/knowledge`
### 8.10.1 页面目标
- 让用户按主题消费轮胎知识

### 8.10.2 本地状态
- `activeTab`
- `expandedId`

### 8.10.3 分类定义
- `ALL`
- `SAFETY`
- `CARE`
- `ROTATION`
- `REPLACEMENT`

### 8.10.4 原子需求
- KNOW-001: 页面标题为“轮胎知识”
- KNOW-002: 顶部必须显示 5 个标签
- KNOW-003: 点击标签后列表按分类过滤
- KNOW-004: 若无结果，显示“暂无该分类内容”
- KNOW-005: 条目默认收起，仅显示标题 + 截断摘要
- KNOW-006: 点击条目后展开全文
- KNOW-007: 同一时间仅允许一个条目展开
- KNOW-008: 展开后显示发布日期
- KNOW-009: 页底固定展示服务承诺 6 宫格

---

## 8.11 门店选择页 `/store-location`
### 8.11.1 页面目标
- 搜索门店并完成单选

### 8.11.2 本地状态
- `searchQuery`
- `selectedStoreId`

### 8.11.3 原子需求
- STORE-001: 页面标题为“精诚服务管家”
- STORE-002: 输入框 placeholder 为“输入关键字”
- STORE-003: 搜索时同时匹配门店名称和地址
- STORE-004: 顶部右侧显示当前车型名称
- STORE-005: 地图区为静态示意，不是实时地图
- STORE-006: 门店列表支持单选
- STORE-007: 首条门店视作“离我最近”
- STORE-008: 选中门店右侧显示实心圆
- STORE-009: 点击“确定”仅回退上一页
- STORE-010: 当前实现未把 `selectedStoreId` 回传调用页

---

## 9. 页面文案清单（当前实现关键文案）
### 9.1 首页关键文案
- 轮胎健康度
- 添加换胎记录
- 轮胎规格
- 已使用里程
- 健康分
- 一键预约
- 轮胎小知识
- 更多
- 轮胎小管家
- 一键咨询
- AI 一键识别磨损
- 一键购买

### 9.2 登录页关键文案
- 轮胎助手
- TireBot · 让每次出行更安心
- 一键登录
- 演示账号：admin / 123456

### 9.3 预约页关键文案
- 服务预约
- 当前车辆
- 选择到店模式
- 上门取送车
- 自行到店
- 下一步
- 预约成功！

---

## 10. 缺口、风险与建议
### 10.1 当前缺口
- 使用 mock 数据，不是真接口
- 多页仍未实现完整 loading / error / empty 分支
- 商品与装饰图仍混有外链
- 历史样本 ID 与当前有效车辆样本不完全一致
- 门店选择结果没有真正写回预约流程

### 10.2 风险
- 当前 PRD 可支撑继续做前端，但如果直接上真实后端，需补接口层与错误处理
- 车辆、商品、门店之间目前仍是演示态联动，非持久化数据

### 10.3 建议的下一轮任务
1. 建立统一 API 层并替换 mock 直读
2. 补全空态/错态/模块态
3. 统一 Header 标题命名
4. 把门店选择真正接回预约页
5. 清理旧样本 ID 遗留

---

## 11. 终版验收矩阵
| 验收编号 | 断言 |
|---|---|
| ACC-001 | 登录页默认填充 admin / 123456 |
| ACC-002 | 登录失败会提示错误 |
| ACC-003 | 首页可切换 3 台车 |
| ACC-004 | 首页健康卡文案跟随车辆状态变化 |
| ACC-005 | 首页商品推荐按 `matchedSpecCode` 过滤 |
| ACC-006 | 首页可进入知识、AI、门店、预约、记录、商品页 |
| ACC-007 | 车辆详情页服务卡只在满足条件时显示 |
| ACC-008 | AI 识别页上传图片后可展示模拟结果 |
| ACC-009 | 规格页可滚轮选择 3 个维度 |
| ACC-010 | 商品页可按规格过滤 |
| ACC-011 | 商品详情页可进入预约 |
| ACC-012 | 预约页可在两种模式间切换 |
| ACC-013 | 预约提交后显示成功页 |
| ACC-014 | 记录页可新增与删除记录 |
| ACC-015 | 知识页可切分类和展开条目 |
| ACC-016 | 门店页可搜索和选择单个门店 |

---

## 12. 本文档的用途
这份 v3 终版适合直接用于:
- AI coding 继续写前端
- 前端任务拆分
- 页面验收 checklist
- 后端联调字段核对
- 产品/设计/研发统一页面理解
