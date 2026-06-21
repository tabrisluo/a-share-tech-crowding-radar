<div align="center">

# 📡 A股科技板块"缩圈雷达" V4.5
# A-share Tech "Shrinking Radar" V4.5

**A股科技板块拥挤度与破裂风险监控系统** | **A-share Technology Sector Crowding & Crash Risk Monitoring System**

</div>

---

## 一句话介绍 / One-liner

一个基于**付鹏"缩圈理论"**和**五维加权评分模型**的A股科技板块（TMT/AI）拥挤度风险监控系统，输出四级风险信号（绿/黄/橙/红），帮助投资者识别泡沫破裂前的预警信号。

A quantitative crowding risk monitoring system for A-share TMT/AI sectors, rooted in **Fu Peng's "Shrinking Circle" theory** and a **five-dimension weighted scoring model**, outputting four-level risk signals (Green/Yellow/Orange/Red) to identify pre-crash warning signs.

---

## 🧠 理论源头 / Theoretical Origin

### 付鹏"缩圈理论" / Fu Peng's "Shrinking Circle" Theory

本系统的核心逻辑源于**付鹏（东北证券首席经济学家）**提出的A股科技板块"缩圈"现象：

> 当AI/TMT成为市场焦点时，资金呈现**自我强化的集中模式**——科技板块像"吸星大法"一样不断从消费、周期等其他板块抽血，形成**"投资宇宙不断缩小"**的格局。当这个"圈子"缩小到极致（成交占比达到历史高位），筹码松动、杠杆脆弱、海外锚定破裂等多重因素共振，泡沫便在自身重量下崩塌。

The core logic originates from **Fu Peng (Chief Economist, Northeast Securities)**, who described how capital in A-share markets exhibits a **self-reinforcing concentration pattern**: when AI/TMT becomes the market's focal point, it continuously **absorbs liquidity** from other sectors (consumption, cyclicals), forming a "shrinking investment universe" — until the circle **collapses under its own weight**.

这一理论被量化为五维评分模型，通过**756日历史分位数**动态捕捉"缩圈"的各个阶段。

This theory is quantified into a five-dimension scoring model, using **756-day historical percentiles** to dynamically capture each stage of the "shrinking" process.

---

## 🏗️ 架构设计 / Architecture

### 五维评分模型（V4.5）/ Five-Dimension Scoring Model (V4.5)

```
Score = S_vol × 0.35 + S_turn × 0.25 + S_margin × 0.20 + S_us × 0.10 + S_div × 0.10
```

| 维度 Dimension | 权重 Weight | 指标 Indicator | 含义 Meaning | 理论映射 Theory Mapping |
|----------------|-------------|---------------|-------------|------------------------|
| **资金虹吸** Capital Siphon | 35% | TMT四大ETF成交额历史分位数 | 资金对科技板块的"抽血"程度 | 付鹏"吸星大法"烈度 Star Absorption intensity |
| **筹码松动** Chip Loosening | 25% | AI龙头平均换手率历史分位数 | 高位放量=早期获利盘撤离 | 缩圈末期筹码分散化 Late-stage chip dispersion |
| **杠杆脆弱** Leverage Fragility | 20% | 融资买入额占比历史分位数 | 杠杆资金是踩踏风险的"易燃物" | 崩溃前的杠杆峰值 Pre-crash leverage peak |
| **全球映射** Global Mapping | 10% | SOX/NVDA是否跌破50日均线 | A股AI估值锚定在美股景气预期 | 海外锚定松动信号 Overseas anchor loosening |
| **量价背离** Price-Volume Divergence | 10% | 放量滞涨检测 | 经典技术见顶信号 | 多头力量耗竭确认 Bull exhaustion confirmation |

### 四级信号体系 / Four-Level Signal System

| 评分 Score | 信号 Signal | 操作铁律 Action | 出现频率 Frequency | 付鹏映射 Fu Peng Mapping |
|-----------|------------|----------------|-------------------|--------------------------|
| < 45 | 🟢 绿灯 Green | 可建仓，单股≤20% / Can build, single stock ≤20% | ~58% | 圈子大，科技股震荡上行 Large circle, steady uptrend |
| 45-65 | 🟡 黄灯 Yellow | 停止加杠杆，停止追高 / Stop leverage, stop chasing | ~27% | 吸星大法发力，消费失血 Siphon active, consumption bleeding |
| 65-80 | 🟠 橙灯 Orange | 考虑减仓至40-60% / Reduce to 40-60% | ~13% | 缩圈最后阶段，筹码松动 Final shrinking stage, chips loosening |
| ≥ 80 | 🔴 红灯 Red | 仓位降至20%以下 / Below 20% tech | ~1-2% | 泡沫临界点，踩踏随时发生 Bubble critical point, stampede imminent |

---

## 📦 产品形态 / Product Forms

### 形态一：Web测算应用 / Web Calculator

**访问地址 / Live URL**: https://i35n65fscun26.ok.kimi.link

- **适用场景 / Use case**: 日常手动输入数据、快速查看评分 / Daily manual input, quick scoring
- **功能 / Features**: 实时滑块调节、仪表盘可视化、五维雷达图、信号卡片 / Real-time sliders, gauge visualization, radar chart, signal cards
- **技术栈 / Stack**: React + TypeScript + Tailwind CSS + shadcn/ui

### 形态二：AI Skill / AI Agent Skill

**文件 / File**: `.skill-package/a-share-tech-crowding-radar.skill`

- **适用场景 / Use case**: 让AI Agent自动完成数据获取→评分计算→报告生成 / Automated data fetching → scoring → report generation
- **触发条件 / Trigger**: 当用户询问"科技板块拥挤度""缩圈雷达信号"等 / When user asks about tech crowding or shrinking radar signals

---

## 🔧 使用方法 / Usage

### Web应用 / Web App

1. 打开 / Open: https://i35n65fscun26.ok.kimi.link
2. 调节三个滑块 / Adjust three sliders (TMT ratio / turnover / margin)
3. 打开两个开关 / Toggle two switches (US breakout / divergence)
4. 查看评分和信号 / View score and signal

### Python脚本 / Python Script

```bash
# 安装依赖 / Install dependencies
pip install numpy pandas

# 命令行计算 / Command-line calculation
python src/calculate_crowding_score.py \
  --tmt-ratio 38.5 \
  --turnover 2.75 \
  --margin 10.5 \
  --us-break true \
  --divergence false
```

```python
# 作为模块导入 / Import as module
from src.calculate_crowding_score import calculate_v45_score

result = calculate_v45_score(
    tmt_ratio=38.5,
    dragon_turnover=2.75,
    margin_ratio=10.5,
    us_break_50ma=True,
    price_volume_divergence=False,
)
# Output: Score: 64.6, Signal: ORANGE
```

---

## 📊 数据说明 / Data Coverage

| 数据类型 Data Type | 来源 Source | 代码 Code |
|-------------------|------------|----------|
| TMT ETF成交额 TMT ETF Turnover | Yahoo Finance | 512760.SS / 512720.SS / 515880.SS / 512980.SS |
| 美股科技指数 US Tech Index | Yahoo Finance | ^SOX / NVDA |
| AI龙头行情 AI Leaders | Yahoo Finance / iFinD | 300308.SZ / 601138.SH / 688256.SH |

**当前数据覆盖 / Current coverage**: **2023年6月 - 2026年6月（约725个交易日 / ~725 trading days）**
**756日视窗目标 / 756-day target**: 差约31天 / ~31 days short, expected **2026年7月底 / late July 2026**

---

## 🧪 方法论演进 / Methodology Evolution

| 阶段 Stage | 内容 Content | 核心改进 Key Improvement |
|-----------|-------------|-------------------------|
| **理论起源** **Theory Origin** | 付鹏"缩圈理论"+"吸星大法" | A股科技板块资金虹吸与泡沫破裂的定性框架 / Qualitative framework for capital siphoning and bubble burst |
| V1 | 概念框架设计 Concept framework | 四象限五指标、三级预警机制 / Four quadrants, five indicators, three-level alerts |
| V2-V3 | 量化建模 Quantitative modeling | 加权评分模型、动态分位数、三轮回测 / Weighted scoring, dynamic percentiles, backtesting |
| V3审视 V3 Review | 专业复核 Professional review | 指出合成数据硬伤等四大缺陷 / Identified four critical flaws |
| **V4.5** | **实战优化** **Production optimization** | **真实ETF数据、756日视窗、归一化100%、50日均线破位** / **Real ETF data, 756-day window, normalized weights, 50-day MA breakout** |

---

## ⚠️ 重要声明 / Disclaimer

1. **本工具仅供研究参考，不构成投资建议 / For research only, not investment advice**
2. **红灯样本量有限 / Red signal sample size is limited**: 当前~725天数据，红灯样本仍需积累 / Current ~725 days, red samples still accumulating
3. **ETF成交额是代理变量 / ETF turnover is a proxy variable**: 不等同于申万TMT全部个股成交额 / Not equivalent to full TMT sector turnover
4. **参数未经完整周期验证 / Parameters not validated through full cycle**: 基于理论推导和有限数据优化 / Based on theoretical derivation and limited data
5. **橙灯"正收益陷阱" / Orange "positive return trap"**: 减仓是风险管理，不是方向预测 / Reducing exposure is risk management, not direction prediction

---

## 📄 许可证 / License

MIT License — 欢迎使用、修改和分发 / Free to use, modify, and distribute.
