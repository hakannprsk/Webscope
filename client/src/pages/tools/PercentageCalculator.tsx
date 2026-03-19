import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [total, setTotal] = useState("");
  const [percentage, setPercentage] = useState("");
  const [results, setResults] = useState<Record<string, string>>({});

  const calculate = () => {
    const v = parseFloat(value);
    const t = parseFloat(total);
    const p = parseFloat(percentage);

    const newResults: Record<string, string> = {};

    if (!isNaN(v) && !isNaN(t) && t !== 0) {
      newResults.percentage = ((v / t) * 100).toFixed(2);
    }

    if (!isNaN(p) && !isNaN(t) && t !== 0) {
      newResults.value = ((p / 100) * t).toFixed(2);
    }

    if (!isNaN(v) && !isNaN(p) && p !== 0) {
      newResults.total = (v / (p / 100)).toFixed(2);
    }

    if (!isNaN(v) && !isNaN(p)) {
      newResults.increase = (v + (v * p) / 100).toFixed(2);
      newResults.decrease = (v - (v * p) / 100).toFixed(2);
    }

    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Yüzde Hesaplayıcı</CardTitle>
            <CardDescription>Yüzde hesaplamaları yapın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Değer</label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Örn: 50"
                  className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Toplam</label>
                <Input
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="Örn: 200"
                  className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Yüzde (%)</label>
                <Input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="Örn: 25"
                  className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full bg-purple-600 hover:bg-purple-700">
              Hesapla
            </Button>

            {Object.keys(results).length > 0 && (
              <div className="space-y-3">
                {results.percentage && (
                  <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
                    <div className="text-xs font-medium text-purple-300 mb-1">Değer Yüzdesi</div>
                    <div className="text-2xl font-bold text-purple-400">{results.percentage}%</div>
                  </div>
                )}

                {results.value && (
                  <div className="bg-slate-700/30 border border-blue-500/20 rounded-lg p-4">
                    <div className="text-xs font-medium text-blue-300 mb-1">Yüzdenin Değeri</div>
                    <div className="text-2xl font-bold text-blue-400">{results.value}</div>
                  </div>
                )}

                {results.total && (
                  <div className="bg-slate-700/30 border border-pink-500/20 rounded-lg p-4">
                    <div className="text-xs font-medium text-pink-300 mb-1">Toplam</div>
                    <div className="text-2xl font-bold text-pink-400">{results.total}</div>
                  </div>
                )}

                {results.increase && (
                  <div className="bg-slate-700/30 border border-green-500/20 rounded-lg p-4">
                    <div className="text-xs font-medium text-green-300 mb-1">Artış</div>
                    <div className="text-2xl font-bold text-green-400">{results.increase}</div>
                  </div>
                )}

                {results.decrease && (
                  <div className="bg-slate-700/30 border border-orange-500/20 rounded-lg p-4">
                    <div className="text-xs font-medium text-orange-300 mb-1">Azalış</div>
                    <div className="text-2xl font-bold text-orange-400">{results.decrease}</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
