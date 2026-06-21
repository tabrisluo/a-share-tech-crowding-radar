import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Shield, TrendingUp, TrendingDown } from 'lucide-react';
import type { SignalResult } from '@/hooks/useCrowdingScore';

interface SignalCardProps {
  signal: SignalResult;
  score: number;
}

export default function SignalCard({ signal, score }: SignalCardProps) {
  const levelConfig = [
    {
      icon: TrendingUp,
      title: '结构健康',
      desc: '资金分布均衡，科技股处于正常趋势区间',
      caution: '可建仓，但单只个股仓位不超过总资产20%',
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
    },
    {
      icon: Shield,
      title: '警惕区域',
      desc: '科技股开始吸引资金，成交占比升至历史中高位',
      caution: '停止新开杠杆，停止追高买入',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
    },
    {
      icon: AlertTriangle,
      title: '高危区域',
      desc: '科技股进入最后疯狂，多指标共振恶化',
      caution: '考虑减仓，降低科技仓位至40-60%。注意：后续可能继续上涨，减仓是为了降低风险暴露',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
    },
    {
      icon: TrendingDown,
      title: '临界崩溃',
      desc: '所有风险指标同时爆表，资金踩踏随时发生',
      caution: '科技仓位无条件降至20%以下，退守固收安全垫',
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
    },
  ];

  const config = levelConfig[signal.level];
  const Icon = config.icon;

  return (
    <Card className={`${config.bg} ${config.border} border-2`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Icon className={`w-5 h-5 ${config.text}`} />
          <span>📢 信号判断</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Big signal display */}
        <div className="text-center py-4">
          <div
            className="text-4xl font-bold mb-2"
            style={{ color: signal.signalColor }}
          >
            {signal.signal}
          </div>
          <div className="text-sm text-muted-foreground">
            拥挤度评分: {score.toFixed(1)} / 100
          </div>
        </div>

        {/* Level description */}
        <div className="space-y-3">
          <div className={`p-3 rounded-lg ${config.bg} ${config.border} border`}>
            <h4 className={`font-semibold text-sm ${config.text} mb-1`}>
              {config.title}
            </h4>
            <p className="text-sm text-gray-700">{config.desc}</p>
          </div>

          <div className={`p-3 rounded-lg ${config.bg} ${config.border} border`}>
            <h4 className="font-semibold text-sm text-gray-800 mb-1">
              🎯 操作铁律
            </h4>
            <p className="text-sm text-gray-700 font-medium">{signal.action}</p>
          </div>

          {signal.level === 2 && (
            <div className="p-3 rounded-lg bg-orange-100 border border-orange-200">
              <h4 className="font-semibold text-sm text-orange-800 mb-1">
                ⚠️ 心魔管理
              </h4>
              <p className="text-xs text-orange-700">
                橙灯后市场可能继续上涨！这不是模型错了，而是"最后的加速段"。
                减仓的核心目的是降低风险暴露，不是预测顶部。即使后续涨了，你的减仓决策在期望值层面仍是正确的。
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
