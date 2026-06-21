import { useState, useCallback, useMemo } from 'react';

export interface CrowdingInputs {
  tmtRatio: number;        // TMT成交额占比 (%)
  dragonTurnover: number;  // 龙头平均换手率 (%)
  marginRatio: number;     // 融资买入额占比 (%)
  usBreak50: boolean;      // 美股是否跌破50日均线
  divergence: boolean;     // 是否量价背离
}

export interface ScoreDetail {
  sVol: number;
  sTurn: number;
  sMargin: number;
  sUs: number;
  sDiv: number;
  total: number;
}

export interface SignalResult {
  signal: string;
  signalColor: string;
  action: string;
  level: number; // 0=green, 1=yellow, 2=orange, 3=red
}

// 历史分位数估算函数（简化版，基于历史数据分布）
function estimatePercentile(value: number, type: 'vol' | 'turn' | 'margin'): number {
  // 基于历史数据的近似分位数映射
  const distributions = {
    vol: { p25: 25, p50: 30, p75: 35, p90: 40, p95: 42 },
    turn: { p25: 4, p50: 6, p75: 9, p90: 12, p95: 15 },
    margin: { p25: 5, p50: 7, p75: 9, p90: 11, p95: 13 },
  };
  const d = distributions[type];
  if (value <= d.p25) return 10 + (value / d.p25) * 15;
  if (value <= d.p50) return 25 + ((value - d.p25) / (d.p50 - d.p25)) * 25;
  if (value <= d.p75) return 50 + ((value - d.p50) / (d.p75 - d.p50)) * 25;
  if (value <= d.p90) return 75 + ((value - d.p75) / (d.p90 - d.p75)) * 15;
  return 90 + Math.min((value - d.p90) / (d.p95 - d.p90) * 10, 10);
}

export function calculateV45Score(inputs: CrowdingInputs): ScoreDetail {
  const sVol = Math.min(estimatePercentile(inputs.tmtRatio, 'vol'), 100);
  const sTurn = Math.min(estimatePercentile(inputs.dragonTurnover, 'turn'), 100);
  const sMargin = Math.min(estimatePercentile(inputs.marginRatio, 'margin'), 100);
  const sUs = inputs.usBreak50 ? 100 : 0;
  const sDiv = inputs.divergence ? 100 : 0;

  const total = sVol * 0.35 + sTurn * 0.25 + sMargin * 0.20 + sUs * 0.10 + sDiv * 0.10;

  return { sVol, sTurn, sMargin, sUs, sDiv, total };
}

export function getSignal(score: number): SignalResult {
  if (score >= 80) {
    return {
      signal: '🔴 红灯',
      signalColor: '#e74c3c',
      action: '临界崩溃点！科技仓位无条件降至20%以下，退守固收安全垫',
      level: 3,
    };
  }
  if (score >= 65) {
    return {
      signal: '🟠 橙灯',
      signalColor: '#e67e22',
      action: '高危区域！考虑减仓，降低科技仓位至40-60%，不再追高',
      level: 2,
    };
  }
  if (score >= 45) {
    return {
      signal: '🟡 黄灯',
      signalColor: '#f1c40f',
      action: '警惕区域！停止新开杠杆，停止追高买入',
      level: 1,
    };
  }
  return {
    signal: '🟢 绿灯',
    signalColor: '#27ae60',
    action: '结构健康！可建仓，但单只个股仓位不超过总资产20%',
    level: 0,
  };
}

export function useCrowdingScore() {
  const [inputs, setInputs] = useState<CrowdingInputs>({
    tmtRatio: 35,
    dragonTurnover: 5,
    marginRatio: 8,
    usBreak50: false,
    divergence: false,
  });

  const updateInput = useCallback(<K extends keyof CrowdingInputs>(
    key: K,
    value: CrowdingInputs[K]
  ) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  }, []);

  const score = useMemo(() => calculateV45Score(inputs), [inputs]);
  const signal = useMemo(() => getSignal(score.total), [score.total]);

  return { inputs, updateInput, score, signal };
}
