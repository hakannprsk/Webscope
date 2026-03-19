import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function URLConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch {
      setOutput("Kod çözme hatası");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">URL Encode/Decode</CardTitle>
            <CardDescription>URL'leri kodlayın veya kod çözün</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Giriş</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="URL veya metni buraya girin"
                  className="min-h-48 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 font-mono text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Çıkış</label>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Sonuç burada görünecek"
                  className="min-h-48 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handleEncode} className="bg-purple-600 hover:bg-purple-700">
                Kodla
              </Button>
              <Button onClick={handleDecode} className="bg-blue-600 hover:bg-blue-700">
                Kod Çöz
              </Button>
              <Button onClick={handleCopy} variant="outline">
                Kopyala
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
