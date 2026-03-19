import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TextReverser() {
  const [text, setText] = useState("");

  const reversed = text.split("").reverse().join("");
  const reversedWords = text.split(" ").reverse().join(" ");
  const reversedLines = text.split("\n").reverse().join("\n");

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Metin Ters Çevirici</CardTitle>
            <CardDescription>Metninizi farklı şekillerde ters çevirin</CardDescription>
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
              <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-purple-300 mb-1">Karakterleri Ters Çevir</div>
                    <div className="text-sm text-gray-300 break-words font-mono">{reversed || "—"}</div>
                  </div>
                  <Button
                    onClick={() => handleCopy(reversed)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                  >
                    Kopyala
                  </Button>
                </div>
              </div>

              <div className="bg-slate-700/30 border border-blue-500/20 rounded-lg p-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-blue-300 mb-1">Kelimeleri Ters Çevir</div>
                    <div className="text-sm text-gray-300 break-words font-mono">{reversedWords || "—"}</div>
                  </div>
                  <Button
                    onClick={() => handleCopy(reversedWords)}
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
                    <div className="text-xs font-medium text-pink-300 mb-1">Satırları Ters Çevir</div>
                    <div className="text-sm text-gray-300 break-words font-mono whitespace-pre-wrap">{reversedLines || "—"}</div>
                  </div>
                  <Button
                    onClick={() => handleCopy(reversedLines)}
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 whitespace-nowrap"
                  >
                    Kopyala
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
