import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Base64Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setError("");
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
    } catch (err) {
      setError("Kodlama hatası");
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      setError("");
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
    } catch (err) {
      setError("Kod çözme hatası");
      setOutput("");
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
            <CardTitle className="text-white">Base64 Encode/Decode</CardTitle>
            <CardDescription>Metni Base64 formatına kodlayın veya kod çözün</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Giriş</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Metni buraya girin veya Base64 yapıştırın"
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

            {error && <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">{error}</div>}

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
