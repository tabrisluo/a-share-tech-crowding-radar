import { useCrowdingScore } from '@/hooks/useCrowdingScore';
import InputPanel from '@/components/InputPanel';
import ScoreGauge from '@/components/ScoreGauge';
import RadarChart from '@/components/RadarChart';
import SignalCard from '@/components/SignalCard';

export default function Home() {
  const { inputs, updateInput, score, signal } = useCrowdingScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📡 A股科技板块"缩圈雷达"
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                V4.5 拥挤度风险监控系统 — 基于真实ETF数据 + 756日视窗 + 归一化权重
              </p>
            </div>
            <div className="text-xs text-muted-foreground text-right hidden sm:block">
              <p>权重: TMT35% + 换手25% + 融资20% + 美股10% + 背离10%</p>
              <p>信号: 绿灯&lt;45 | 黄灯45-65 | 橙灯65-80 | 红灯≥80</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input Panel */}
          <div className="lg:col-span-3">
            <InputPanel inputs={inputs} onUpdate={updateInput} />
          </div>

          {/* Center: Gauge + Radar */}
          <div className="lg:col-span-5 space-y-6">
            <ScoreGauge score={score} signal={signal} />
            <RadarChart score={score} />
          </div>

          {/* Right: Signal Card */}
          <div className="lg:col-span-4">
            <SignalCard signal={signal} score={score.total} />
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="mt-8">
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">📋 快速对照表</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">评分区间</th>
                    <th className="text-left py-2 px-3">灯号</th>
                    <th className="text-left py-2 px-3">市场特征</th>
                    <th className="text-left py-2 px-3">操作铁律</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-green-50">
                    <td className="py-2 px-3 font-mono">&lt; 45</td>
                    <td className="py-2 px-3">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                      绿灯
                    </td>
                    <td className="py-2 px-3">结构健康，资金分布均衡</td>
                    <td className="py-2 px-3 font-medium">可建仓，单股≤20%</td>
                  </tr>
                  <tr className="border-b bg-yellow-50">
                    <td className="py-2 px-3 font-mono">45-65</td>
                    <td className="py-2 px-3">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
                      黄灯
                    </td>
                    <td className="py-2 px-3">科技股吸引资金，成交占比中高</td>
                    <td className="py-2 px-3 font-medium">停止加杠杆，停止追高</td>
                  </tr>
                  <tr className="border-b bg-orange-50">
                    <td className="py-2 px-3 font-mono">65-80</td>
                    <td className="py-2 px-3">
                      <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
                      橙灯
                    </td>
                    <td className="py-2 px-3">科技股最后疯狂，多指标共振</td>
                    <td className="py-2 px-3 font-medium">考虑减仓至40-60%</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="py-2 px-3 font-mono">≥ 80</td>
                    <td className="py-2 px-3">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                      红灯
                    </td>
                    <td className="py-2 px-3">所有指标爆表，临界崩溃点</td>
                    <td className="py-2 px-3 font-medium">仓位降至20%以下</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-muted-foreground pb-6">
          <p>
            基于Gemini"缩圈雷达"原始设计 + Kimi量化回测优化 + Gemini三轮审视修正 | V4.5
          </p>
          <p className="mt-1">
            本工具仅供研究参考，不构成投资建议。股市有风险，投资需谨慎。
          </p>
        </footer>
      </main>
    </div>
  );
}
