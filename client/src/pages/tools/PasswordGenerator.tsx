import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    let generated = "";
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Şifre Oluşturucu</CardTitle>
            <CardDescription>Güçlü ve rastgele şifreler oluşturun</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Şifre Uzunluğu: {length}</label>
              <input
                type="range"
                min="4"
                max="128"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 block">Seçenekler</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.uppercase}
                    onCheckedChange={() => toggleOption("uppercase")}
                    id="uppercase"
                  />
                  <label htmlFor="uppercase" className="text-sm text-gray-300 cursor-pointer">
                    Büyük Harfler (A-Z)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.lowercase}
                    onCheckedChange={() => toggleOption("lowercase")}
                    id="lowercase"
                  />
                  <label htmlFor="lowercase" className="text-sm text-gray-300 cursor-pointer">
                    Küçük Harfler (a-z)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.numbers}
                    onCheckedChange={() => toggleOption("numbers")}
                    id="numbers"
                  />
                  <label htmlFor="numbers" className="text-sm text-gray-300 cursor-pointer">
                    Rakamlar (0-9)
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={options.symbols}
                    onCheckedChange={() => toggleOption("symbols")}
                    id="symbols"
                  />
                  <label htmlFor="symbols" className="text-sm text-gray-300 cursor-pointer">
                    Özel Karakterler (!@#$...)
                  </label>
                </div>
              </div>
            </div>

            {password && (
              <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
                <div className="text-xs font-medium text-purple-300 mb-2">Oluşturulan Şifre</div>
                <div className="text-lg font-mono text-white break-all">{password}</div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={generatePassword} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Oluştur
              </Button>
              {password && (
                <Button onClick={handleCopy} variant="outline" className="flex-1">
                  Kopyala
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
