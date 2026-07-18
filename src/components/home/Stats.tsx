import { motion } from "motion/react";
import { STATS } from "@/content/ar/home";

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft md:grid-cols-4 md:p-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <div className="text-3xl font-black md:text-4xl text-gradient">{s.value}</div>
            <div className="mt-2 text-xs text-muted-foreground md:text-sm">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
