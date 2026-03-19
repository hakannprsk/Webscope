import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { Search, Grid3x3, Heart } from "lucide-react";

const tools = [
  { id: 1, name: "Kelime Sayacı", slug: "word-counter", category: "Metin", icon: "📝" },
  { id: 2, name: "Büyük/Küçük Harf", slug: "case-converter", category: "Metin", icon: "🔤" },
  { id: 3, name: "Metin Ters Çevirici", slug: "text-reverser", category: "Metin", icon: "↩️" },
  { id: 4, name: "Renk Seçici", slug: "color-picker", category: "Görsel", icon: "🎨" },
  { id: 5, name: "QR Kod Oluşturucu", slug: "qr-code", category: "Görsel", icon: "📱" },
  { id: 6, name: "Gradient Oluşturucu", slug: "gradient-generator", category: "Görsel", icon: "🌈" },
  { id: 7, name: "Temel Hesap Makinesi", slug: "calculator", category: "Hesap", icon: "🧮" },
  { id: 8, name: "Yüzde Hesaplayıcı", slug: "percentage-calculator", category: "Hesap", icon: "%" },
  { id: 9, name: "Birim Dönüştürücü", slug: "unit-converter", category: "Dönüştürücü", icon: "📏" },
  { id: 10, name: "URL Encode/Decode", slug: "url-converter", category: "Geliştirici", icon: "🔗" },
  { id: 11, name: "Base64 Encode/Decode", slug: "base64-converter", category: "Geliştirici", icon: "🔐" },
  { id: 12, name: "JSON Biçimlendirici", slug: "json-formatter", category: "Geliştirici", icon: "{ }" },
  { id: 13, name: "Kronometre", slug: "stopwatch", category: "Zaman", icon: "⏱️" },
  { id: 14, name: "Şifre Oluşturucu", slug: "password-generator", category: "Rastgele", icon: "🔑" },
  { id: 15, name: "UUID Oluşturucu", slug: "uuid-generator", category: "Rastgele", icon: "🆔" },
  { id: 16, name: "Lorem Ipsum", slug: "lorem-ipsum", category: "Rastgele", icon: "📄" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(tools.map((t) => t.category)));

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">KralTools</h1>
              <p className="text-purple-300 text-sm mt-1">50+ Dijital Araç Platformu</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Heart className="w-4 h-4" />
              Favorilerim
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Araç ara..."
              className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "default" : "outline"}
            className={selectedCategory === null ? "bg-purple-600" : ""}
          >
            <Grid3x3 className="w-4 h-4 mr-2" />
            Tümü
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? "default" : "outline"}
              className={selectedCategory === cat ? "bg-purple-600" : ""}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(`/tools/${tool.slug}`)}
              className="group bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-purple-500/20 text-left"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-white font-semibold group-hover:text-purple-300 transition-colors">{tool.name}</h3>
              <p className="text-xs text-gray-400 mt-2">{tool.category}</p>
            </button>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Araç bulunamadı. Lütfen arama kriterlerinizi değiştirin.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-slate-900/50 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2026 KralTools. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}
