import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Flame, Wind } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const forecastData = Array.from({ length: 90 }, (_, i) => {
  const day = i + 1;
  const base = 55 + day * 0.35 + Math.sin(day / 7) * 3;
  return {
    day: `Day ${day}`,
    capacity: Math.min(Math.round(base + Math.random() * 4), 100),
    predicted: day > 30 ? Math.min(Math.round(base + 2 + Math.random() * 3), 100) : null,
  };
});

const overflowDay = forecastData.findIndex((d) => (d.predicted ?? d.capacity) >= 90);

const risks = [
  { icon: AlertTriangle, label: "Overflow Risk", value: overflowDay > 0 ? `Day ${overflowDay}` : "Low", level: overflowDay > 0 && overflowDay < 60 ? "high" : "medium" },
  { icon: Wind, label: "Methane Risk Score", value: "7.2 / 10", level: "high" },
  { icon: Flame, label: "Fire Hazard Probability", value: "23%", level: "medium" },
  { icon: TrendingUp, label: "Fill Rate", value: "0.35% / day", level: "low" },
];

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: "8px", color: "hsl(150, 20%, 92%)" },
};

export default function LandfillForecast() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Landfill Forecasting</h1>
        <p className="text-muted-foreground mt-1">Time-series prediction of landfill capacity and risk assessment</p>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {risks.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-4 border-l-4 ${
              r.level === "high" ? "border-l-destructive" : r.level === "medium" ? "border-l-warning" : "border-l-primary"
            }`}
          >
            <r.icon className={`w-5 h-5 mb-2 ${
              r.level === "high" ? "text-destructive" : r.level === "medium" ? "text-warning" : "text-primary"
            }`} />
            <p className="text-xs text-muted-foreground">{r.label}</p>
            <p className="font-display font-bold text-foreground">{r.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6">
        <h3 className="font-display font-semibold text-foreground mb-4">Capacity Forecast (Next 90 Days)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis dataKey="day" stroke="hsl(220, 10%, 50%)" fontSize={11} interval={9} />
            <YAxis stroke="hsl(220, 10%, 50%)" fontSize={12} domain={[40, 100]} unit="%" />
            <Tooltip {...chartTooltipStyle} />
            <ReferenceLine y={90} stroke="hsl(0, 72%, 50%)" strokeDasharray="5 5" label={{ value: "⚠ 90% Critical", fill: "hsl(0, 72%, 50%)", fontSize: 12 }} />
            <Line type="monotone" dataKey="capacity" stroke="hsl(160, 84%, 39%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="predicted" stroke="hsl(38, 92%, 50%)" strokeWidth={2} strokeDasharray="8 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-0.5 bg-primary" /> Actual
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-0.5 bg-warning border-dashed" /> Predicted
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-4 h-0.5 bg-destructive" /> Critical Threshold
          </div>
        </div>
      </motion.div>
    </div>
  );
}
