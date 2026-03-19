import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  const handleCopy = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
  };

  const handleClear = () => {
    setUuids([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">UUID Oluşturucu</CardTitle>
            <CardDescription>Benzersiz tanımlayıcılar (UUID) oluşturun</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Kaç UUID oluştur? ({count})</label>
              <input
                type="range"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {uuids.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Oluşturulan UUID'ler</label>
                <Textarea
                  value={uuids.join("\n")}
                  readOnly
                  className="min-h-48 bg-slate-700/50 border-purple-500/30 text-white font-mono text-sm"
                />
              </div>
            )}

            {uuids.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {uuids.map((uuid, index) => (
                  <div key={index} className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-sm text-gray-300 font-mono">{uuid}</span>
                    <Button
                      onClick={() => handleCopy(uuid)}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                    >
                      Kopyala
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleGenerate} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Oluştur
              </Button>
              {uuids.length > 0 && (
                <>
                  <Button onClick={handleCopyAll} variant="outline" className="flex-1">
                    Tümünü Kopyala
                  </Button>
                  <Button onClick={handleClear} variant="outline" className="flex-1">
                    Temizle
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
