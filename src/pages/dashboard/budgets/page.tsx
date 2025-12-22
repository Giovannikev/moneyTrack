import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const sampleBudgets = [
  { id: "food", label: "Alimentation", amount: 250, spent: 120 },
  { id: "transport", label: "Transport", amount: 80, spent: 35 },
  { id: "leisure", label: "Loisirs", amount: 100, spent: 60 },
]

export default function BudgetsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Créer un budget</CardTitle>
          <CardDescription>Définissez un montant par catégorie</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Field>
              <FieldGroup>
                <FieldLabel>Catégorie</FieldLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alimentation">Alimentation</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Loisirs">Loisirs</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </Field>
            <Field>
              <FieldGroup>
                <FieldLabel>Montant</FieldLabel>
                <Input type="number" placeholder="0.00" />
              </FieldGroup>
            </Field>
            <div className="flex items-end">
              <Button>Enregistrer</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budgets actifs</CardTitle>
          <CardDescription>Progression par catégorie</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {sampleBudgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.amount) * 100))
            return (
              <div key={b.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{b.label}</div>
                  <div className="text-muted-foreground text-sm">{b.spent} / {b.amount} €</div>
                </div>
                <div className="mt-2 h-2 w-full rounded bg-muted">
                  <div className="h-full rounded bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

