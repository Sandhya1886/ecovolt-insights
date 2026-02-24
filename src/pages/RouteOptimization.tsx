import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Truck, Fuel, Leaf, Route, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockRouteResult = {
  distance: 47.2,
  distanceSaved: 18.3,
  fuelSaving: 28,
  emissionsReduced: 12.4,
  stops: ["Depot", "Zone A - Industrial", "Zone B - Residential", "Zone C - Commercial", "Zone D - Market", "Processing Plant"],
};

export default function RouteOptimization() {
  const [bins, setBins] = useState("12");
  const [capacity, setCapacity] = useState("8");
  const [fuelCost, setFuelCost] = useState("1.5");
  const [result, setResult] = useState<typeof mockRouteResult | null>(null);
  const [optimizing, setOptimizing] = useState(false);

  const optimize = () => {
    setOptimizing(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockRouteResult);
      setOptimizing(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Route Optimization</h1>
        <p className="text-muted-foreground mt-1">AI-powered waste collection route planning</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Parameters</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Number of Bins</Label>
              <Input type="number" value={bins} onChange={(e) => setBins(e.target.value)} className="mt-1 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-muted-foreground">Truck Capacity (tons)</Label>
              <Input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="mt-1 bg-secondary border-border" />
            </div>
            <div>
              <Label className="text-muted-foreground">Fuel Cost ($/L)</Label>
              <Input type="number" value={fuelCost} onChange={(e) => setFuelCost(e.target.value)} className="mt-1 bg-secondary border-border" />
            </div>
            <Button className="w-full gradient-primary text-primary-foreground font-semibold" onClick={optimize} disabled={optimizing}>
              <Play className="w-4 h-4 mr-2" /> {optimizing ? "Optimizing..." : "Optimize Route"}
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          {/* Map placeholder */}
          <div className="glass-card p-6 h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="relative text-center">
              <Map className="w-12 h-12 text-primary/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                {optimizing ? "Computing optimal route..." : result ? "Optimized route calculated" : "Route map visualization"}
              </p>
              {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center justify-center gap-2 flex-wrap">
                  {result.stops.map((s, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs">
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">{s}</span>
                      {i < result.stops.length - 1 && <Route className="w-3 h-3 text-muted-foreground" />}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <MetricCard icon={Route} label="Total Distance" value={`${result.distance} km`} />
              <MetricCard icon={Map} label="Distance Saved" value={`${result.distanceSaved} km`} />
              <MetricCard icon={Fuel} label="Fuel Savings" value={`${result.fuelSaving}%`} accent />
              <MetricCard icon={Leaf} label="CO₂ Reduced" value={`${result.emissionsReduced} kg`} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`glass-card p-4 ${accent ? "glow-border" : ""}`}>
      <Icon className="w-5 h-5 text-primary mb-2" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display font-bold text-foreground">{value}</p>
    </div>
  );
}
