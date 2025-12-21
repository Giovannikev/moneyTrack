import { Receipt, Wallet, BarChart3, Calendar } from "lucide-react"

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const sampleExpenses = [
  { id: "1", label: "Courses", amount: 54.9, category: "Alimentation", date: "2025-12-01" },
  { id: "2", label: "Transport", amount: 18.0, category: "Transport", date: "2025-12-02" },
  { id: "3", label: "Abonnement", amount: 9.99, category: "Abonnements", date: "2025-12-03" },
  { id: "4", label: "Restaurant", amount: 32.5, category: "Alimentation", date: "2025-12-04" },
]

const sampleBudgets = [
  { id: "Alimentation", amount: 250, spent: 120 },
  { id: "Transport", amount: 80, spent: 35 },
  { id: "Loisirs", amount: 100, spent: 60 },
]

export function SectionCards() {
  const totalMonth = sampleExpenses.reduce((s, e) => s + e.amount, 0)
  const transactionsCount = sampleExpenses.length
  const budgetTotal = sampleBudgets.reduce((s, b) => s + b.amount, 0)
  const budgetSpent = sampleBudgets.reduce((s, b) => s + b.spent, 0)
  const budgetRemaining = Math.max(0, budgetTotal - budgetSpent)
  const topCategory = sampleExpenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})
  const [topCatName, topCatAmount] = Object.entries(topCategory).sort((a, b) => b[1] - a[1])[0] || ["—", 0]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Dépenses du mois</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalMonth.toFixed(2)} €
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Receipt />
              {transactionsCount} transactions
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Synthèse du mois en cours</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Budget restant</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {budgetRemaining.toFixed(2)} €
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Wallet />
              {Math.round((budgetSpent / Math.max(1, budgetTotal)) * 100)}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">{budgetSpent.toFixed(2)} € dépensés sur {budgetTotal.toFixed(2)} €</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Catégorie principale</CardDescription>
          <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
            {topCatName}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <BarChart3 />
              {topCatAmount.toFixed(2)} €
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Somme du mois par catégorie</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Période</CardDescription>
          <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
            Décembre 2025
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Calendar />
              30 jours
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Vue mensuelle des dépenses</div>
        </CardFooter>
      </Card>
    </div>
  )
}
