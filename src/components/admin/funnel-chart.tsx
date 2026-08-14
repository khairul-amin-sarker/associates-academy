"use client";

import { Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Landing sessions", value: 12840, fill: "#4B67A5" },
  { name: "50%+ scroll", value: 6410, fill: "#365692" },
  { name: "CTA clicks", value: 2860, fill: "#26447D" },
  { name: "Checkout started", value: 1126, fill: "#17346A" },
  { name: "Verified purchase", value: 523, fill: "#0E2758" },
];

export function FunnelVisualization({ demo }: { demo: boolean }) {
  const visible = demo ? data : data.map((item) => ({ ...item, value: 0 }));
  return <div className="h-[300px] w-full" aria-label="First-party marketing funnel chart"><ResponsiveContainer width="100%" height="100%"><FunnelChart><Tooltip formatter={(value) => Number(value).toLocaleString("bn-BD")} contentStyle={{ borderRadius: 12, borderColor: "#ded4c5", fontFamily: "inherit" }} /><Funnel dataKey="value" data={visible} isAnimationActive={false}><LabelList position="right" fill="#111844" stroke="none" dataKey="name" fontSize={12} /><LabelList position="center" fill="#fff" stroke="none" dataKey="value" fontSize={13} /></Funnel></FunnelChart></ResponsiveContainer></div>;
}
