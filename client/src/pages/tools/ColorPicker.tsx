import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
}

export default function ColorPicker() {
  const [color, setColor] = useState("#FF6B9D");
  const rgb = hexToRgb(color);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Renk Seçici</CardTitle>
            <CardDescription>Renk kodlarını farklı formatlarda görün</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Renk Seç</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-20 h-12 rounded cursor-pointer border-2 border-purple-500/30"
                  />
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#FF6B9D"
                    className="flex-1 bg-slate-700/50 border-purple-500/30 text-white"
                  />
                </div>
              </div>
              <div
                className="w-full md:w-32 h-32 rounded-lg border-4 border-purple-500/30 shadow-lg"
                style={{ backgroundColor: color }}
              />
            </div>

            <div className="space-y-3">
              <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-purple-300 mb-1">HEX</div>
                    <div className="text-sm text-gray-300 font-mono">{color}</div>
                  </div>
                  <Button
                    onClick={() => handleCopy(color)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                  >
                    Kopyala
                  </Button>
                </div>
              </div>

              {rgb && (
                <>
                  <div className="bg-slate-700/30 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-blue-300 mb-1">RGB</div>
                        <div className="text-sm text-gray-300 font-mono">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
                      </div>
                      <Button
                        onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                      >
                        Kopyala
                      </Button>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 border border-pink-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <div className="text-xs font-medium text-pink-300 mb-1">RGB (Yüzde)</div>
                        <div className="text-sm text-gray-300 font-mono">
                          rgb({Math.round((rgb.r / 255) * 100)}%, {Math.round((rgb.g / 255) * 100)}%,
                          {Math.round((rgb.b / 255) * 100)}%)
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          handleCopy(
                            `rgb(${Math.round((rgb.r / 255) * 100)}%, ${Math.round((rgb.g / 255) * 100)}%, ${Math.round((rgb.b / 255) * 100)}%)`
                          )
                        }
                        size="sm"
                        className="bg-pink-600 hover:bg-pink-700 whitespace-nowrap"
                      >
                        Kopyala
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
