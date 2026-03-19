import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { RouteComponentProps } from "wouter";

// Import all tool components
import WordCounter from "./tools/WordCounter";
import CaseConverter from "./tools/CaseConverter";
import TextReverser from "./tools/TextReverser";
import ColorPicker from "./tools/ColorPicker";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import GradientGenerator from "./tools/GradientGenerator";
import Calculator from "./tools/Calculator";
import PercentageCalculator from "./tools/PercentageCalculator";
import UnitConverter from "./tools/UnitConverter";
import URLConverter from "./tools/URLConverter";
import Base64Converter from "./tools/Base64Converter";
import JSONFormatter from "./tools/JSONFormatter";
import Stopwatch from "./tools/Stopwatch";
import PasswordGenerator from "./tools/PasswordGenerator";
import UUIDGenerator from "./tools/UUIDGenerator";
import LoremIpsumGenerator from "./tools/LoremIpsumGenerator";

const toolComponents: Record<string, React.ComponentType> = {
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "text-reverser": TextReverser,
  "color-picker": ColorPicker,
  "qr-code": QRCodeGenerator,
  "gradient-generator": GradientGenerator,
  calculator: Calculator,
  "percentage-calculator": PercentageCalculator,
  "unit-converter": UnitConverter,
  "url-converter": URLConverter,
  "base64-converter": Base64Converter,
  "json-formatter": JSONFormatter,
  stopwatch: Stopwatch,
  "password-generator": PasswordGenerator,
  "uuid-generator": UUIDGenerator,
  "lorem-ipsum": LoremIpsumGenerator,
};

export default function ToolPage(props: RouteComponentProps<{ slug: string }>) {
  const [, navigate] = useLocation();
  const slug = props.params.slug;
  const Component = toolComponents[slug];

  if (!Component) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Araç Bulunamadı</h1>
          <p className="text-gray-400 mb-6">Aradığınız araç mevcut değil.</p>
          <Button onClick={() => navigate("/")} className="bg-purple-600 hover:bg-purple-700">
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button onClick={() => navigate("/")} variant="ghost" className="gap-2 text-gray-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Geri
          </Button>
        </div>
      </header>
      <Component />
    </div>
  );
}
