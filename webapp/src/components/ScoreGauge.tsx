import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScoreDetail, SignalResult } from '@/hooks/useCrowdingScore';

interface ScoreGaugeProps {
  score: ScoreDetail;
  signal: SignalResult;
}

export default function ScoreGauge({ score, signal }: ScoreGaugeProps) {
  const percentage = Math.min(score.total, 100);
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const zones = [
    { label: '绿灯', min: 0, max: 45, color: '#27ae60' },
    { label: '黄灯', min: 45, max: 65, color: '#f1c40f' },
    { label: '橙灯', min: 65, max: 80, color: '#e67e22' },
    { label: '红灯', min: 80, max: 100, color: '#e74c3c' },
  ];

  // const currentZone = zones.find(z => percentage >= z.min && percentage < z.max) || zones[3];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">🎯 拥挤度评分</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {/* SVG Gauge */}
        <div className="relative w-56 h-40">
          <svg viewBox="0 0 200 130" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M 30 110 A 80 80 0 0 1 170 110"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Colored zones */}
            {zones.map((zone) => {
              const startAngle = 180 - (zone.min / 100) * 180;
              const endAngle = 180 - (zone.max / 100) * 180;
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const x1 = 100 + 80 * Math.cos(startRad);
              const y1 = 110 - 80 * Math.sin(startRad);
              const x2 = 100 + 80 * Math.cos(endRad);
              const y2 = 110 - 80 * Math.sin(endRad);
              const largeArc = Math.abs(startAngle - endAngle) > 180 ? 1 : 0;
              return (
                <path
                  key={zone.label}
                  d={`M ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2}`}
                  fill="none"
                  stroke={zone.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  opacity={0.3}
                />
              );
            })}
            {/* Value arc */}
            <path
              d="M 30 110 A 80 80 0 0 1 170 110"
              fill="none"
              stroke={signal.signalColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference / 2}
              strokeDashoffset={strokeDashoffset / 2}
            />
            {/* Center text */}
            <text x="100" y="95" textAnchor="middle" fontSize="36" fontWeight="bold" fill={signal.signalColor}>
              {score.total.toFixed(1)}
            </text>
            <text x="100" y="115" textAnchor="middle" fontSize="12" fill="#6b7280">
              / 100
            </text>
          </svg>
        </div>

        {/* Score breakdown */}
        <div className="w-full mt-4 space-y-2">
          {[
            { label: 'TMT成交占比', score: score.sVol, weight: 35 },
            { label: '龙头换手率', score: score.sTurn, weight: 25 },
            { label: '融资买入占比', score: score.sMargin, weight: 20 },
            { label: '美股映射', score: score.sUs, weight: 10 },
            { label: '量价背离', score: score.sDiv, weight: 10 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-xs w-24 text-muted-foreground">{item.label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: item.score > 80 ? '#e74c3c' : item.score > 60 ? '#e67e22' : '#3b82f6',
                  }}
                />
              </div>
              <span className="text-xs font-mono w-10 text-right">{item.score.toFixed(0)}</span>
              <span className="text-xs text-muted-foreground w-8">{item.weight}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
