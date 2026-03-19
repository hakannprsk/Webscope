import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CaseConverter() {
  const [text, setText] = useState("");

  const conversions = {
    uppercase: text.toUpperCase(),
    lowercase: text.toLowerCase(),
    capitalize: text.replace(/\b\w/g, (char) => char.toUpperCase()),
    sentence: text.replace(/^\w/, (char) => char.toUpperCase()).replace(/([.!?]\s+)(\w)/g, (_, sep, char) => sep + char.toUpperCase()),
    toggle: text.replace(/\w/g, (char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase())),
    camelCase: text.replace(/\s+(.)/g, (_, char) => char.toUpperCase()).replace(/^\w/, (char) => char.toLowerCase()),
    snakeCase: text.toLowerCase().replace(/\s+/g, "_"),
    kebabCase: text.toLowerCase().replace(/\s+/g, "-"),
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Büyük/Küçük Harf Dönüştürücü</CardTitle>
            <CardDescription>Metninizi farklı formatlara dönüştürün</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Orijinal Metin</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Metninizi buraya girin..."
                className="min-h-32 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-3">
              {Object.entries(conversions).map(([key, value]) => (
                <div key={key} className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-purple-300 mb-1 capitalize">
                        {key === "uppercase" && "BÜYÜK HARFLER"}
                        {key === "lowercase" && "küçük harfler"}
                        {key === "capitalize" && "Her Kelimenin İlk Harfi Büyük"}
                        {key === "sentence" && "Cümle Başı Büyük Harfli"}
                        {key === "toggle" && "aLtErNaTiF hArFLer"}
                        {key === "camelCase" && "camelCase"}
                        {key === "snakeCase" && "snake_case"}
                        {key === "kebabCase" && "kebab-case"}
                      </div>
                      <div className="text-sm text-gray-300 break-words">{value || "—"}</div>
                    </div>
                    <Button
                      onClick={() => handleCopy(value)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                    >
                      Kopyala
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
