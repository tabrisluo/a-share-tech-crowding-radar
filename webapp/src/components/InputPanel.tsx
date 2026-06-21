import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CrowdingInputs } from '@/hooks/useCrowdingScore';

interface InputPanelProps {
  inputs: CrowdingInputs;
  onUpdate: <K extends keyof CrowdingInputs>(key: K, value: CrowdingInputs[K]) => void;
}

export default function InputPanel({ inputs, onUpdate }: InputPanelProps) {
  const sliders = [
    {
      key: 'tmtRatio' as const,
      label: 'TMT成交额占比',
      unit: '%',
      min: 10,
      max: 55,
      step: 0.5,
      description: '电子+计算机+通信+传媒成交额 / 全A成交额',
    },
    {
      key: 'dragonTurnover' as const,
      label: '龙头平均换手率',
      unit: '%',
      min: 0.5,
      max: 25,
      step: 0.5,
      description: '中际旭创、工业富联、寒武纪等AI龙头平均日换手率',
    },
    {
      key: 'marginRatio' as const,
      label: '融资买入额占比',
      unit: '%',
      min: 2,
      max: 18,
      step: 0.5,
      description: 'TMT板块单日融资买入额 / TMT板块单日总成交额',
    },
  ];

  const switches = [
    {
      key: 'usBreak50' as const,
      label: '美股跌破50日均线',
      description: 'NVDA或SOX指数当前价格低于50日移动平均线',
    },
    {
      key: 'divergence' as const,
      label: '量价背离',
      description: 'TMT指数价格低于20日均线，但成交额高于20日均值',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">📊 输入指标</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sliders.map((s) => (
          <div key={s.key} className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">{s.label}</Label>
              <span className="text-sm font-bold text-primary">
                {inputs[s.key]}{s.unit}
              </span>
            </div>
            <Slider
              value={[inputs[s.key]]}
              min={s.min}
              max={s.max}
              step={s.step}
              onValueChange={(v) => onUpdate(s.key, v[0])}
            />
            <p className="text-xs text-muted-foreground">{s.description}</p>
          </div>
        ))}

        <div className="pt-2 space-y-4">
          {switches.map((sw) => (
            <div key={sw.key} className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">{sw.label}</Label>
                <p className="text-xs text-muted-foreground">{sw.description}</p>
              </div>
              <Switch
                checked={inputs[sw.key]}
                onCheckedChange={(v) => onUpdate(sw.key, v)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
