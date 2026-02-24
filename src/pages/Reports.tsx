import { motion } from "framer-motion";
import { FileText, Download, Calendar, TrendingUp, Leaf, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { title: "Daily Waste Collection Report", date: "Feb 24, 2026", type: "Daily", icon: Calendar, metrics: "847 tons collected, 32 trucks deployed" },
  { title: "Monthly Sustainability Summary", date: "January 2026", type: "Monthly", icon: Leaf, metrics: "124 tons CO₂ reduced, 15% improvement" },
  { title: "Energy Production Report", date: "January 2026", type: "Monthly", icon: Zap, metrics: "198,400 kWh generated from waste" },
  { title: "Carbon Reduction Statement", date: "Q4 2025", type: "Quarterly", icon: TrendingUp, metrics: "450 tons CO₂ offset, exceeding targets by 12%" },
  { title: "Route Optimization Analysis", date: "February 2026", type: "Monthly", icon: FileText, metrics: "28% fuel savings, 18.3 km avg reduction" },
];

export default function Reports() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Reports & Insights</h1>
        <p className="text-muted-foreground mt-1">Generate and download sustainability reports</p>
      </div>

      <div className="flex gap-3 mb-8 flex-wrap">
        <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
          <Download className="w-4 h-4 mr-2" /> Export All as PDF
        </Button>
        <Button variant="outline" className="border-border text-muted-foreground hover:bg-secondary">
          <Download className="w-4 h-4 mr-2" /> Export as CSV
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:glow-border transition-shadow duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">{r.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{r.date} · {r.type}</p>
                <p className="text-sm text-secondary-foreground mt-1">{r.metrics}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:bg-secondary text-xs">
                <Download className="w-3 h-3 mr-1" /> PDF
              </Button>
              <Button size="sm" variant="outline" className="border-border text-muted-foreground hover:bg-secondary text-xs">
                <Download className="w-3 h-3 mr-1" /> CSV
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
