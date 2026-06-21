#!/usr/bin/env python3
"""
V4.5 Crowding Score Calculator
Calculates composite crowding score (0-100) for A-share TMT/AI sectors.

Usage:
    python calculate_crowding_score.py --tmt-ratio 38.5 --turnover 2.75 --margin 10.5 --us-break true
"""

import argparse
import numpy as np


def calculate_percentile(value: float, history: list) -> float:
    """Calculate historical percentile (0-100) of a value."""
    if not history:
        return 50.0
    arr = np.array(history)
    percentile = (arr < value).mean() * 100
    return float(np.clip(percentile, 0, 100))


def calculate_v45_score(
    tmt_ratio: float,
    dragon_turnover: float,
    margin_ratio: float,
    us_break_50ma: bool,
    price_volume_divergence: bool,
    history_tmt: list = None,
    history_turnover: list = None,
    history_margin: list = None,
) -> dict:
    """
    Calculate V4.5 crowding score.
    
    Score = S_vol * 0.35 + S_turn * 0.25 + S_margin * 0.20 + S_us * 0.10 + S_div * 0.10
    
    All S sub-scores are normalized 0-100.
    """
    # Default empty histories
    history_tmt = history_tmt or []
    history_turnover = history_turnover or []
    history_margin = history_margin or []

    # 1. TMT turnover ratio percentile (35% weight)
    s_vol = calculate_percentile(tmt_ratio, history_tmt)

    # 2. Dragon turnover percentile (25% weight)
    s_turn = calculate_percentile(dragon_turnover, history_turnover)

    # 3. Margin buying ratio percentile (20% weight)
    s_margin = calculate_percentile(margin_ratio, history_margin)

    # 4. US mapping: 50-day MA breakout (10% weight)
    s_us = 100.0 if us_break_50ma else 0.0

    # 5. Price-volume divergence (10% weight)
    s_div = 100.0 if price_volume_divergence else 0.0

    # Composite score
    total = s_vol * 0.35 + s_turn * 0.25 + s_margin * 0.20 + s_us * 0.10 + s_div * 0.10

    # Signal level
    if total >= 80:
        signal = "RED"
        signal_emoji = "🔴"
        action = "Critical crash point! Reduce tech positions below 20%, retreat to fixed income"
    elif total >= 65:
        signal = "ORANGE"
        signal_emoji = "🟠"
        action = "High risk zone! Consider reducing tech positions to 40-60%, stop chasing highs"
    elif total >= 45:
        signal = "YELLOW"
        signal_emoji = "🟡"
        action = "Caution zone! Stop adding leverage, stop chasing highs"
    else:
        signal = "GREEN"
        signal_emoji = "🟢"
        action = "Healthy structure! Can build positions, single stock <= 20% of portfolio"

    return {
        "score": round(total, 1),
        "signal": signal,
        "signal_emoji": signal_emoji,
        "action": action,
        "breakdown": {
            "tmt_turnover": {"raw": tmt_ratio, "percentile": round(s_vol, 1), "weight": 35, "contribution": round(s_vol * 0.35, 1)},
            "dragon_turnover": {"raw": dragon_turnover, "percentile": round(s_turn, 1), "weight": 25, "contribution": round(s_turn * 0.25, 1)},
            "margin_ratio": {"raw": margin_ratio, "percentile": round(s_margin, 1), "weight": 20, "contribution": round(s_margin * 0.20, 1)},
            "us_mapping": {"break_50ma": us_break_50ma, "score": s_us, "weight": 10, "contribution": round(s_us * 0.10, 1)},
            "divergence": {"detected": price_volume_divergence, "score": s_div, "weight": 10, "contribution": round(s_div * 0.10, 1)},
        }
    }


def main():
    parser = argparse.ArgumentParser(description="V4.5 Crowding Score Calculator")
    parser.add_argument("--tmt-ratio", type=float, required=True, help="TMT turnover ratio (%)")
    parser.add_argument("--turnover", type=float, required=True, help="AI leader average turnover (%)")
    parser.add_argument("--margin", type=float, required=True, help="Margin buying ratio (%)")
    parser.add_argument("--us-break", type=str, required=True, choices=["true", "false"], help="US tech below 50-day MA")
    parser.add_argument("--divergence", type=str, default="false", choices=["true", "false"], help="Price-volume divergence")
    parser.add_argument("--history-tmt", type=float, nargs="+", help="Historical TMT ratios for percentile")
    parser.add_argument("--history-turnover", type=float, nargs="+", help="Historical turnover rates")
    parser.add_argument("--history-margin", type=float, nargs="+", help="Historical margin ratios")

    args = parser.parse_args()

    result = calculate_v45_score(
        tmt_ratio=args.tmt_ratio,
        dragon_turnover=args.turnover,
        margin_ratio=args.margin,
        us_break_50ma=args.us_break == "true",
        price_volume_divergence=args.divergence == "true",
        history_tmt=args.history_tmt,
        history_turnover=args.history_turnover,
        history_margin=args.history_margin,
    )

    print(f"\n{'='*60}")
    print(f"Crowding Score: {result['score']}/100")
    print(f"Signal: {result['signal_emoji']} {result['signal']}")
    print(f"Action: {result['action']}")
    print(f"{'='*60}")
    print("\nBreakdown:")
    for key, val in result['breakdown'].items():
        if key in ['us_mapping', 'divergence']:
            status = "YES" if val.get('break_50ma') or val.get('detected') else "NO"
            print(f"  {key:20s}: score={val['score']:5.1f} × weight={val['weight']}% = {val['contribution']:5.1f} [{status}]")
        else:
            print(f"  {key:20s}: raw={val['raw']:5.1f} percentile={val['percentile']:5.1f} × weight={val['weight']}% = {val['contribution']:5.1f}")


if __name__ == "__main__":
    main()
