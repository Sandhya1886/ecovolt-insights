import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Brain, Zap, CheckCircle, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const exampleResults = [
  { type: "Plastic", confidence: 92, method: "Pyrolysis", energy: 600, color: "hsl(200, 80%, 50%)" },
  { type: "Organic", confidence: 97, method: "Anaerobic Digestion (Biogas)", energy: 250, color: "hsl(160, 84%, 39%)" },
  { type: "E-waste", confidence: 88, method: "Specialized Recycling", energy: 150, color: "hsl(0, 72%, 50%)" },
  { type: "Metal", confidence: 95, method: "Smelting & Recovery", energy: 100, color: "hsl(38, 92%, 50%)" },
  { type: "Glass", confidence: 90, method: "Cullet Recycling", energy: 80, color: "hsl(280, 60%, 55%)" },
];

export default function Classification() {
  const [result, setResult] = useState<typeof exampleResults[0] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const simulateClassification = () => {
    setResult(null);
    setAnalyzing(true);
    setTimeout(() => {
      setResult(exampleResults[Math.floor(Math.random() * exampleResults.length)]);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Waste Classification</h1>
        <p className="text-muted-foreground mt-1">AI-powered waste identification using computer vision</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload area */}
        <div>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); simulateClassification(); }}
            className={`glass-card border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300
              ${dragOver ? "border-primary bg-primary/5 glow-border" : "border-border/50 hover:border-primary/40"}`}
            onClick={simulateClassification}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {analyzing ? (
                <Brain className="w-8 h-8 text-primary animate-pulse" />
              ) : (
                <Upload className="w-8 h-8 text-primary" />
              )}
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">
              {analyzing ? "Analyzing..." : "Upload Waste Image"}
            </h3>
            <p className="text-muted-foreground text-sm">
              Drag & drop or click to upload. Supports JPG, PNG.
            </p>
            <Button className="mt-6 gradient-primary text-primary-foreground" disabled={analyzing}>
              <ImageIcon className="w-4 h-4 mr-2" />
              {analyzing ? "Processing..." : "Select Image"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Demo mode: Click to simulate AI classification
          </p>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-6 glow-border"
            >
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-foreground">Classification Result</h3>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Detected Type</p>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ background: result.color }} />
                    <span className="font-display text-2xl font-bold text-foreground">{result.type}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Confidence</p>
                  <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full gradient-primary"
                    />
                  </div>
                  <p className="text-sm font-semibold text-primary mt-1">{result.confidence}%</p>
                </div>

                <div className="glass-card p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Recommended Method</span>
                    <span className="text-sm font-medium text-foreground">{result.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Energy</span>
                    <span className="text-sm font-semibold text-primary flex items-center gap-1">
                      <Zap className="w-4 h-4" /> {result.energy} kWh/ton
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-6 flex items-center justify-center"
            >
              <div className="text-center">
                <Brain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Upload an image to see AI classification results</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
