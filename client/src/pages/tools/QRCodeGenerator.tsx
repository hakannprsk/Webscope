import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://example.com");
  const [qrUrl, setQrUrl] = useState("");
  const [size, setSize] = useState(300);

  useEffect(() => {
    if (text) {
      const encodedText = encodeURIComponent(text);
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`);
    }
  }, [text, size]);

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qrcode.png";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("İndir hatası:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">QR Kod Oluşturucu</CardTitle>
            <CardDescription>Metin veya URL'den QR kod oluşturun</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Metin/URL</label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Boyut: {size}px</label>
              <input
                type="range"
                min="100"
                max="500"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="flex justify-center">
              {qrUrl && (
                <div className="bg-white p-4 rounded-lg border-4 border-purple-500/30">
                  <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleDownload} className="flex-1 bg-purple-600 hover:bg-purple-700">
                İndir
              </Button>
              <Button
                onClick={() => navigator.clipboard.writeText(qrUrl)}
                variant="outline"
                className="flex-1"
              >
                URL'yi Kopyala
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
