import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, DollarSign, Leaf, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const wasteEnergyMap: Record<string, { factor: number; method: string }> = {
  organic: { factor: 250, method: "Anaerobic Digestion (Biogas)" },
  plastic: { factor: 600, method: "Pyrolysis / Incineration" },
  metal: { factor: 100, method: "Smelting & Recovery" },
  glass: { factor: 80, method: "Cullet Recycling" },
  ewaste: { factor: 150, method: "Specialized Recycling" },
  mixed: { factor: 350, method: "Mass Burn Incineration" },
};

export default function EnergyPrediction() {
  const [weight, setWeight] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [moisture, setMoisture] = useState("30");
  const [calorific, setCalorific] = useState("15");
  const [result, setResult] = useState<{
    energy: number; method: string; revenue: number; impact: number;
  } | null>(null);

  const predict = () => {
    const w = parseFloat(weight);
    const m = parseFloat(moisture);
    const c = parseFloat(calorific);
    if (!w || !wasteType) return;

    const base = wasteEnergyMap[wasteType];
    const moistureAdj = 1 - (m / 100) * 0.5;
    const calorificAdj = c / 15;
    const energy = Math.round(w * base.factor * moistureAdj * calorificAdj);
    const revenue = Math.round(energy * 0.08);
    const impact = Math.round(energy * 0.0004 * 100) / 100;

    setResult({ energy, method: base.method, revenue, impact });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Energy Prediction</h1>
        <p className="text-muted-foreground mt-1">ML-powered waste-to-energy generation estimator</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-6">Input Parameters</h3>
          <div className="space-y-5">
            <div>
              <Label className="text-muted-foreground">Waste Weight (tons)</Label>
              <Input type="number" placeholder="e.g. 10" value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-muted-foreground">Waste Type</Label>
              <Select value={wasteType} onValueChange={setWasteType}>
                <SelectTrigger className="mt-1 bg-secondary border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                  <SelectItem value="ewaste">E-waste</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Moisture Content (%)</Label>
              <Input type="number" placeholder="30" value={moisture} onChange={(e) => setMoisture(e.target.value)} className="mt-1 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-muted-foreground">Calorific Value (MJ/kg)</Label>
              <Input type="number" placeholder="15" value={calorific} onChange={(e) => setCalorific(e.target.value)} className="mt-1 bg-secondary border-border" />
            </div>
            <Button className="w-full gradient-primary text-primary-foreground font-semibold h-11" onClick={predict}>
              <Zap className="w-4 h-4 mr-2" /> Predict Energy Output
            </Button>
          </div>
        </div>

        {result ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <GaugeCard icon={Zap} label="Estimated Energy" value={`${result.energy.toLocaleString()} kWh`} accent />
            <GaugeCard icon={Gauge} label="Best Processing Method" value={result.method} />
            <GaugeCard icon={DollarSign} label="Revenue Estimate" value={`$${result.revenue.toLocaleString()}`} />
            <GaugeCard icon={Leaf} label="CO₂ Reduction" value={`${result.impact} tons`} />
          </motion.div>
        ) : (
          <div className="glass-card p-6 flex items-center justify-center">
            <div className="text-center">
              <Zap className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Fill in the parameters and click predict</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GaugeCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`glass-card p-5 ${accent ? "glow-border" : ""}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ? "gradient-primary" : "bg-secondary"}`}>
          <Icon className={`w-5 h-5 ${accent ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`font-display font-bold text-lg ${accent ? "text-primary" : "text-foreground"}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}
