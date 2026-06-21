# 快速开始 / Quick Start

## 方式一：Web应用（浏览器直接使用）/ Web App (Browser)

已部署地址 / Live URL: https://i35n65fscun26.ok.kimi.link

本地运行 / Local run:
```bash
cd webapp
npm install
npm run dev
```

## 方式二：Python评分引擎 / Python Scoring Engine

```bash
pip install numpy pandas

# 命令行计算 / Command-line
python src/calculate_crowding_score.py \
  --tmt-ratio 38.5 \
  --turnover 2.75 \
  --margin 10.5 \
  --us-break true

# 或作为模块导入 / Or import as module
python -c "from src.calculate_crowding_score import calculate_v45_score; \
  print(calculate_v45_score(38.5, 2.75, 10.5, True, False))"
```

## 方式三：AI Skill / AI Agent Skill

导入 `.skill-package/a-share-tech-crowding-radar.skill` 到支持Skill的AI Agent中使用。

Import `.skill-package/a-share-tech-crowding-radar.skill` into an AI Agent that supports Skills.
