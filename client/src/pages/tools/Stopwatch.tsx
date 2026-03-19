import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleLap = () => {
    setLaps([...laps, time]);
  };
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Kronometre</CardTitle>
            <CardDescription>Zamanı ölçün ve tur kaydedin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-900 rounded-lg p-8 text-center">
              <div className="text-6xl font-bold text-purple-400 font-mono">{formatTime(time)}</div>
            </div>

            <div className="flex gap-2 justify-center">
              {!isRunning ? (
                <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700 px-8">
                  Başla
                </Button>
              ) : (
                <Button onClick={handlePause} className="bg-yellow-600 hover:bg-yellow-700 px-8">
                  Duraklat
                </Button>
              )}
              <Button onClick={handleLap} className="bg-blue-600 hover:bg-blue-700 px-8" disabled={!isRunning}>
                Tur
              </Button>
              <Button onClick={handleReset} className="bg-red-600 hover:bg-red-700 px-8">
                Sıfırla
              </Button>
            </div>

            {laps.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Turlar</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {laps.map((lap, index) => (
                    <div key={index} className="bg-slate-700/30 border border-purple-500/20 rounded-lg p-3 flex justify-between">
                      <span className="text-gray-400">Tur {index + 1}</span>
                      <span className="text-purple-400 font-mono">{formatTime(lap)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
