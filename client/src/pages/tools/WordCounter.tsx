import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.trim() ? text.split("\n").length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).length : 0,
    sentences: text.trim() ? (text.match(/[.!?]+/g) || []).length : 0,
  };

  const handleClear = () => setText("");
  const handleCopy = () => {
    const summary = `Kelime: ${stats.words}\nKarakter: ${stats.characters}\nKarakter (boşluksuz): ${stats.charactersNoSpaces}\nSatır: ${stats.lines}\nParagraf: ${stats.paragraphs}\nCümle: ${stats.sentences}`;
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Kelime Sayacı</CardTitle>
            <CardDescription>Metninizi yapıştırın ve istatistiklerini görün</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Metni Girin</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Metninizi buraya yapıştırın..."
                className="min-h-48 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{stats.words}</div>
                <div className="text-xs text-gray-400 mt-1">Kelime</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{stats.characters}</div>
                <div className="text-xs text-gray-400 mt-1">Karakter</div>
              </div>
              <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-pink-400">{stats.charactersNoSpaces}</div>
                <div className="text-xs text-gray-400 mt-1">Kar. (boşluksuz)</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{stats.lines}</div>
                <div className="text-xs text-gray-400 mt-1">Satır</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{stats.paragraphs}</div>
                <div className="text-xs text-gray-400 mt-1">Paragraf</div>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-400">{stats.sentences}</div>
                <div className="text-xs text-gray-400 mt-1">Cümle</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleCopy} className="flex-1 bg-purple-600 hover:bg-purple-700">
                İstatistikleri Kopyala
              </Button>
              <Button onClick={handleClear} variant="outline" className="flex-1">
                Temizle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
