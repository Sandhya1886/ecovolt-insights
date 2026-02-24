import { motion } from "framer-motion";
import {
  Zap, Truck, Leaf, TrendingDown, Gauge,
} from "lucide-react";
import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from "recharts";

const widgets = [
  { label: "Waste Collected Today", value: "847", unit: "tons", icon: Leaf, change: "+12%" },
  { label: "Predicted Energy Output", value: "198,400", unit: "kWh", icon: Zap, change: "+8%" },
  { label: "CO₂ Emissions Reduced", value: "124", unit: "tons", icon: TrendingDown, change: "+15%" },
  { label: "Active Collection Trucks", value: "32", unit: "active", icon: Truck, change: "94%" },
  { label: "Landfill Capacity", value: "67", unit: "%", icon: Gauge, change: "-2%" },
];

const wasteTypes = [
  { name: "Organic", value: 38, color: "hsl(160, 84%, 39%)" },
  { name: "Plastic", value: 24, color: "hsl(200, 80%, 50%)" },
  { name: "Metal", value: 14, color: "hsl(38, 92%, 50%)" },
  { name: "Glass", value: 12, color: "hsl(280, 60%, 55%)" },
  { name: "E-waste", value: 12, color: "hsl(0, 72%, 50%)" },
];

const dailyWaste = [
  { day: "Mon", organic: 120, plastic: 80, metal: 40, glass: 30, ewaste: 25 },
  { day: "Tue", organic: 135, plastic: 75, metal: 45, glass: 35, ewaste: 20 },
  { day: "Wed", organic: 110, plastic: 90, metal: 38, glass: 28, ewaste: 30 },
  { day: "Thu", organic: 145, plastic: 85, metal: 50, glass: 32, ewaste: 22 },
  { day: "Fri", organic: 160, plastic: 95, metal: 42, glass: 38, ewaste: 28 },
  { day: "Sat", organic: 90, plastic: 60, metal: 30, glass: 20, ewaste: 15 },
  { day: "Sun", organic: 80, plastic: 50, metal: 25, glass: 18, ewaste: 12 },
];

const energyForecast = [
  { month: "Jan", actual: 180000, predicted: 175000 },
  { month: "Feb", actual: 195000, predicted: 190000 },
  { month: "Mar", actual: 210000, predicted: 215000 },
  { month: "Apr", actual: 198000, predicted: 205000 },
  { month: "May", actual: 225000, predicted: 220000 },
  { month: "Jun", actual: null, predicted: 235000 },
  { month: "Jul", actual: null, predicted: 245000 },
];

const carbonData = [
  { week: "W1", reduced: 28 }, { week: "W2", reduced: 32 },
  { week: "W3", reduced: 27 }, { week: "W4", reduced: 35 },
  { week: "W5", reduced: 40 }, { week: "W6", reduced: 38 },
  { week: "W7", reduced: 42 }, { week: "W8", reduced: 45 },
];

const chartTooltipStyle = {
  contentStyle: { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: "8px", color: "hsl(150, 20%, 92%)" },
  labelStyle: { color: "hsl(150, 20%, 85%)" },
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time waste-to-energy analytics</p>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {widgets.map((w, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-4 hover:glow-border transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <w.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-primary">{w.change}</span>
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{w.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{w.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Waste Distribution Pie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Waste Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={wasteTypes} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" strokeWidth={2} stroke="hsl(220, 18%, 10%)">
                {wasteTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip {...chartTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {wasteTypes.map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                {t.name} {t.value}%
              </div>
            ))}
          </div>
        </motion.div>

        {/* Daily Waste Trend */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-foreground mb-4">Daily Waste Generation</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dailyWaste}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 50%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 50%)" fontSize={12} />
              <Tooltip {...chartTooltipStyle} />
              <Area type="monotone" dataKey="organic" stackId="1" fill="hsl(160, 84%, 39%)" fillOpacity={0.6} stroke="hsl(160, 84%, 39%)" />
              <Area type="monotone" dataKey="plastic" stackId="1" fill="hsl(200, 80%, 50%)" fillOpacity={0.6} stroke="hsl(200, 80%, 50%)" />
              <Area type="monotone" dataKey="metal" stackId="1" fill="hsl(38, 92%, 50%)" fillOpacity={0.4} stroke="hsl(38, 92%, 50%)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Energy Forecast */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Energy Generation Forecast</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={energyForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 50%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 50%)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip {...chartTooltipStyle} formatter={(v: number) => `${(v / 1000).toFixed(0)}k kWh`} />
              <Bar dataKey="actual" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="predicted" fill="hsl(200, 80%, 50%)" radius={[4, 4, 0, 0]} opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Carbon Reduction */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Carbon Reduction Tracker</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="week" stroke="hsl(220, 10%, 50%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 50%)" fontSize={12} unit=" t" />
              <Tooltip {...chartTooltipStyle} />
              <Line type="monotone" dataKey="reduced" stroke="hsl(160, 84%, 39%)" strokeWidth={3} dot={{ fill: "hsl(160, 84%, 39%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
