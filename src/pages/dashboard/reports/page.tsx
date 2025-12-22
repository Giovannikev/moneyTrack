import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

const data = [
  { month: "Jan", total: 320 },
  { month: "Fév", total: 280 },
  { month: "Mar", total: 410 },
  { month: "Avr", total: 360 },
  { month: "Mai", total: 295 },
  { month: "Juin", total: 375 },
]

const config = {
  total: {
    label: "Total",
    color: "hsl(var(--primary))",
  },
} as const

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Dépenses par mois</CardTitle>
          <CardDescription>Vue synthétique</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="4 4" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="total" fill="var(--color-total)" radius={[6, 6, 0, 0]} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

