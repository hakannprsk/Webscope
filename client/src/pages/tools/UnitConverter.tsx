import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const conversions = {
  length: {
    name: "Uzunluk",
    units: {
      mm: 1,
      cm: 10,
      m: 1000,
      km: 1000000,
      inch: 25.4,
      foot: 304.8,
      yard: 914.4,
      mile: 1609344,
    },
  },
  weight: {
    name: "Ağırlık",
    units: {
      mg: 1,
      g: 1000,
      kg: 1000000,
      oz: 28349.5,
      lb: 453592,
      ton: 1000000000,
    },
  },
  temperature: {
    name: "Sıcaklık",
    units: {
      celsius: "C",
      fahrenheit: "F",
      kelvin: "K",
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "—";

    if (category === "temperature") {
      return convertTemperature(numValue, fromUnit, toUnit);
    }

    const units = conversions[category as keyof typeof conversions].units;
    const fromFactor = units[fromUnit as keyof typeof units] as number;
    const toFactor = units[toUnit as keyof typeof units] as number;
    const result = (numValue * fromFactor) / toFactor;
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const convertTemperature = (val: number, from: string, to: string): string => {
    let celsius = val;

    if (from === "fahrenheit") {
      celsius = (val - 32) * (5 / 9);
    } else if (from === "kelvin") {
      celsius = val - 273.15;
    }

    let result = celsius;
    if (to === "fahrenheit") {
      result = celsius * (9 / 5) + 32;
    } else if (to === "kelvin") {
      result = celsius + 273.15;
    }

    return result.toFixed(2);
  };

  const currentCategory = conversions[category as keyof typeof conversions];
  const units = Object.keys(currentCategory.units);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Birim Dönüştürücü</CardTitle>
            <CardDescription>Uzunluk, ağırlık ve sıcaklık birimlerini dönüştürün</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Kategori</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-purple-500/30">
                  {Object.entries(conversions).map(([key, val]) => (
                    <SelectItem key={key} value={key} className="text-white">
                      {val.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Değer</label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-slate-700/50 border-purple-500/30 text-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Kaynak Birim</label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-purple-500/30">
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit} className="text-white">
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Hedef Birim</label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-purple-500/30">
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit} className="text-white">
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Sonuç</div>
              <div className="text-3xl font-bold text-purple-400">
                {convert()} {toUnit}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
