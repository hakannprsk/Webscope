import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);

    if (previous === null) {
      setPrevious(current);
    } else if (operation) {
      const result = calculate(previous, current, operation);
      setDisplay(String(result));
      setPrevious(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "*":
        return prev * current;
      case "/":
        return prev / current;
      case "%":
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previous !== null) {
      const current = parseFloat(display);
      const result = calculate(previous, current, operation);
      setDisplay(String(result));
      setPrevious(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevious(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
      setNewNumber(false);
    }
  };

  const buttonClass = "h-16 text-lg font-semibold rounded-lg transition-colors";
  const numberButtonClass = `${buttonClass} bg-slate-700 hover:bg-slate-600 text-white`;
  const operationButtonClass = `${buttonClass} bg-purple-600 hover:bg-purple-700 text-white`;
  const equalsButtonClass = `${buttonClass} bg-green-600 hover:bg-green-700 text-white`;
  const clearButtonClass = `${buttonClass} bg-red-600 hover:bg-red-700 text-white`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <Card className="bg-slate-800/50 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Temel Hesap Makinesi</CardTitle>
            <CardDescription>Basit matematiksel işlemler yapın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 text-right">
              <div className="text-gray-400 text-sm mb-2">
                {previous !== null && operation ? `${previous} ${operation}` : ""}
              </div>
              <div className="text-4xl font-bold text-white break-words">{display}</div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button onClick={handleClear} className={`${clearButtonClass} col-span-2`}>
                Temizle
              </Button>
              <Button onClick={() => handleOperation("/")} className={operationButtonClass}>
                ÷
              </Button>
              <Button onClick={() => handleOperation("*")} className={operationButtonClass}>
                ×
              </Button>

              <Button onClick={() => handleNumber("7")} className={numberButtonClass}>
                7
              </Button>
              <Button onClick={() => handleNumber("8")} className={numberButtonClass}>
                8
              </Button>
              <Button onClick={() => handleNumber("9")} className={numberButtonClass}>
                9
              </Button>
              <Button onClick={() => handleOperation("-")} className={operationButtonClass}>
                −
              </Button>

              <Button onClick={() => handleNumber("4")} className={numberButtonClass}>
                4
              </Button>
              <Button onClick={() => handleNumber("5")} className={numberButtonClass}>
                5
              </Button>
              <Button onClick={() => handleNumber("6")} className={numberButtonClass}>
                6
              </Button>
              <Button onClick={() => handleOperation("+")} className={operationButtonClass}>
                +
              </Button>

              <Button onClick={() => handleNumber("1")} className={numberButtonClass}>
                1
              </Button>
              <Button onClick={() => handleNumber("2")} className={numberButtonClass}>
                2
              </Button>
              <Button onClick={() => handleNumber("3")} className={numberButtonClass}>
                3
              </Button>
              <Button onClick={() => handleOperation("%")} className={operationButtonClass}>
                %
              </Button>

              <Button onClick={() => handleNumber("0")} className={`${numberButtonClass} col-span-2`}>
                0
              </Button>
              <Button onClick={handleDecimal} className={numberButtonClass}>
                .
              </Button>
              <Button onClick={handleEquals} className={equalsButtonClass}>
                =
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
