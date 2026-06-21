import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScoreDetail } from '@/hooks/useCrowdingScore';

interface RadarChartProps {
  score: ScoreDetail;
}

export default function RadarChart({ score }: RadarChartProps) {
  const categories = [
    { key: 'sVol', label: 'TMT\n成交占比', angle: -90 },
    { key: 'sTurn', label: '龙头\n换手率', angle: -18 },
    { key: 'sMargin', label: '融资\n买入占比', angle: 54 },
    { key: 'sUs', label: '美股\n映射', angle: 126 },
    { key: 'sDiv', label: '量价\n背离', angle: 198 },
  ];

  const size = 220;
  const center = size / 2;
  const radius = 75;
  const maxScore = 100;

  // Calculate polygon points
  const points = categories.map((cat) => {
    const value = score[cat.key as keyof ScoreDetail] as number;
    const rad = ((cat.angle - 90) * Math.PI) / 180;
    const r = (value / maxScore) * radius;
    return `${center + r * Math.cos(rad)},${center + r * Math.sin(rad)}`;
  }).join(' ');

  // Grid circles
  const grids = [20, 40, 60, 80, 100];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">🕸️ 五维风险雷达</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <svg viewBox={`0 0 ${size} ${size}`} width="220" height="220">
          {/* Grid circles */}
          {grids.map((g) => (
            <circle
              key={g}
              cx={center}
              cy={center}
              r={(g / maxScore) * radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}

          {/* Axis lines */}
          {categories.map((cat) => {
            const rad = ((cat.angle - 90) * Math.PI) / 180;
            return (
              <line
                key={cat.key}
                x1={center}
                y1={center}
                x2={center + radius * Math.cos(rad)}
                y2={center + radius * Math.sin(rad)}
                stroke="#e5e7eb"
                strokeWidth="0.5"
              />
            );
          })}

          {/* Data polygon */}
          <polygon
            points={points}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Data points */}
          {categories.map((cat) => {
            const value = score[cat.key as keyof ScoreDetail] as number;
            const rad = ((cat.angle - 90) * Math.PI) / 180;
            const r = (value / maxScore) * radius;
            const x = center + r * Math.cos(rad);
            const y = center + r * Math.sin(rad);
            return (
              <circle key={cat.key} cx={x} cy={y} r="4" fill="#3b82f6" />
            );
          })}

          {/* Labels */}
          {categories.map((cat) => {
            const rad = ((cat.angle - 90) * Math.PI) / 180;
            const labelR = radius + 18;
            const x = center + labelR * Math.cos(rad);
            const y = center + labelR * Math.sin(rad);
            const value = score[cat.key as keyof ScoreDetail] as number;
            return (
              <g key={`label-${cat.key}`}>
                <text
                  x={x}
                  y={y - 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#6b7280"
                >
                  {cat.label.split('\n')[0]}
                </text>
                <text
                  x={x}
                  y={y + 8}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#3b82f6"
                >
                  {value.toFixed(0)}
                </text>
              </g>
            );
          })}
        </svg>
      </CardContent>
    </Card>
  );
}
