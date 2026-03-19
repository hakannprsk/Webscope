import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const loremWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
];

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(5);
  const [type, setType] = useState("paragraphs");
  const [output, setOutput] = useState("");

  const generateLoremIpsum = () => {
    let result = "";

    if (type === "words") {
      const words = [];
      for (let i = 0; i < count; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      result = words.join(" ");
    } else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        const sentenceLength = Math.floor(Math.random() * 10) + 5;
        const words = [];
        for (let j = 0; j < sentenceLength; j++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        const sentence = words.join(" ");
        sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
      }
      result = sentences.join(" ");
    } else {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        const sentenceCount = Math.floor(Math.random() * 5) + 3;
        const sentences = [];
        for (let j = 0; j < sentenceCount; j++) {
          const sentenceLength = Math.floor(Math.random() * 10) + 5;
          const words = [];
          for (let k = 0; k < sentenceLength; k++) {
            words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
          }
          const sentence = words.join(" ");
          sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
        }
        paragraphs.push(sentences.join(" "));
      }
      result = paragraphs.join("\n\n");
    }

    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Lorem Ipsum Oluşturucu</CardTitle>
            <CardDescription>Yer tutucu metin oluşturun</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Miktar: {count}</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Tip</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-purple-500/30">
                    <SelectItem value="words" className="text-white">
                      Kelimeler
                    </SelectItem>
                    <SelectItem value="sentences" className="text-white">
                      Cümleler
                    </SelectItem>
                    <SelectItem value="paragraphs" className="text-white">
                      Paragraflar
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {output && (
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Çıkış</label>
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-48 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={generateLoremIpsum} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Oluştur
              </Button>
              {output && (
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
