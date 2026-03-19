import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#FF6B9D");
  const [color2, setColor2] = useState("#C44569");
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState("linear");

  const gradient =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const cssCode = `background: ${gradient};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
  };

  const handleCopyGradient = () => {
    navigator.clipboard.writeText(gradient);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Gradient Oluşturucu</CardTitle>
            <CardDescription>CSS gradient kodları oluşturun</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Renk 1</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-16 h-10 rounded cursor-pointer border-2 border-purple-500/30"
                  />
                  <Input
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="flex-1 bg-slate-700/50 border-purple-500/30 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Renk 2</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-16 h-10 rounded cursor-pointer border-2 border-purple-500/30"
                  />
                  <Input
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="flex-1 bg-slate-700/50 border-purple-500/30 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Tip</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-purple-500/30">
                    <SelectItem value="linear" className="text-white">
                      Doğrusal
                    </SelectItem>
                    <SelectItem value="radial" className="text-white">
                      Radyal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {type === "linear" && (
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Açı: {angle}°</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div
              className="w-full h-48 rounded-lg border-4 border-purple-500/30 shadow-lg"
              style={{ background: gradient }}
            />

            <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
              <div className="text-xs font-medium text-purple-300 mb-2">CSS Kodu</div>
              <div className="text-sm text-gray-300 font-mono break-all">{cssCode}</div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1 bg-purple-600 hover:bg-purple-700">
                CSS'yi Kopyala
              </Button>
              <Button onClick={handleCopyGradient} variant="outline" className="flex-1">
                Gradient'i Kopyala
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
