# V4.5 Methodology Documentation

## Theoretical Origin

This system's core logic originates from **Fu Peng's (付鹏) "Shrinking Circle" (缩圈) theory and "Star Absorption" (吸星大法) framework**, which describes how capital in A-share markets exhibits a self-reinforcing concentration pattern: when a sector (especially AI/TMT) becomes the market's focal point, it continuously absorbs liquidity from other sectors (consumption, cyclicals), forming a "shrinking investment universe" — until the circle collapses under its own weight.

This theory was first quantified into a monitoring system through iterative model optimization, with four critical refinements applied:

1. Synthetic data → Real TMT ETF turnover data
2. 252-day window → 756-day window (3-year medium cycle)
3. Capped 110% weights → Normalized 100% weights
4. Single-day >5% drop → 50-day MA breakout

## Scoring Formula

```
Score = S_vol × 0.35 + S_turn × 0.25 + S_margin × 0.20 + S_us × 0.10 + S_div × 0.10
```

All S sub-scores are normalized to 0-100 range before weighting.

## Sub-indicators

### 1. TMT Turnover Ratio (35%)
- **Definition**: Combined daily turnover of 4 TMT ETFs (512760+512720+515880+512980) as proxy for sector concentration
- **Calculation**: S_vol = percentile(current_volume, 756-day_history) × 100
- **Rationale**: Direct measure of "crowding" - how much capital is concentrated in tech

### 2. Dragon Turnover Rate (25%)
- **Definition**: Average daily turnover of top 3 AI leaders (中际旭创, 工业富联, 寒武纪)
- **Calculation**: S_turn = percentile(current_turnover, 756-day_history) × 100
- **Rationale**: High turnover at peaks = early profit-takers exiting, latecomers entering

### 3. Margin Buying Ratio (20%)
- **Definition**: TMT sector margin buying / total TMT turnover
- **Calculation**: S_margin = percentile(current_ratio, 756-day_history) × 100
- **Rationale**: Margin capital is cost-sensitive and has rigid liquidation lines

### 4. US Tech Mapping (10%)
- **Definition**: Whether SOX or NVDA has broken below 50-day moving average
- **Calculation**: S_us = 100 if breakout detected, else 0
- **Rationale**: A-share AI chain valuation is anchored to NVDA/AMD earnings expectations

### 5. Price-Volume Divergence (10%)
- **Definition**: TMT index < 20-day MA while turnover > 20-day average
- **Calculation**: S_div = 100 if divergence detected, else 0
- **Rationale**: Classic technical topping signal - volume rising but price stagnating

## Signal Levels

| Score | Signal | Action | Psychology |
|-------|--------|--------|------------|
| <45 | Green | Can build, single stock ≤20% | Don't FOMO, but don't miss opportunity |
| 45-65 | Yellow | Stop leverage, stop chasing | Enjoy trend but add no new risk |
| 65-80 | Orange | Reduce to 40-60% | **Key**: Market may keep rising! Reducing exposure is EV-optimal even if direction is wrong |
| ≥80 | Red | Below 20% tech, retreat to bonds | Once-in-a-blue-moon signal - better safe than sorry |

## Key Design Insight

The Orange signal's "positive return trap" is the hardest psychological challenge. Historical backtests show markets can rise 2-6% in the 20 days after orange. But the core purpose of orange is **risk exposure management**, not **direction prediction**. When crowding reaches historical highs, the marginal expected return of new positions drops sharply while potential drawdown risk rises sharply. Reducing exposure is the mathematically optimal decision regardless of short-term direction.

## Data Requirements

- **Minimum history**: 756 trading days (~3 years) for accurate percentile calculation
- **Current available**: ~725 days (2023.6-2026.6) from Yahoo Finance ETF data
- **Gap to 756-day target**: ~31 days (will reach full target by late July 2026)
- **Practical window**: Use all available ~725 days until 756-day threshold is reached
- **Data sources**: Yahoo Finance (ETF + US tech), iFinD (A-share leaders), Exchange (margin data)
