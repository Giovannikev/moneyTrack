import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const sampleExpenses = [
  { id: "1", label: "Courses", amount: 54.9, category: "Alimentation", date: "2025-12-01" },
  { id: "2", label: "Transport", amount: 18.0, category: "Transport", date: "2025-12-02" },
  { id: "3", label: "Abonnement", amount: 9.99, category: "Abonnements", date: "2025-12-03" },
]

export default function ExpensesPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
          <CardDescription>Affinez la liste des dépenses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Field>
              <FieldGroup>
                <FieldLabel>Recherche</FieldLabel>
                <Input placeholder="Rechercher" />
              </FieldGroup>
            </Field>
            <Field>
              <FieldGroup>
                <FieldLabel>Catégorie</FieldLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="food">Alimentation</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="subscriptions">Abonnements</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </Field>
            <Field>
              <FieldGroup>
                <FieldLabel>Date</FieldLabel>
                <Input type="date" />
              </FieldGroup>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste</CardTitle>
          <CardDescription>Vos dernières dépenses</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          {sampleExpenses.map((exp) => (
            <div key={exp.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="font-medium">{exp.label}</div>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <div className="text-muted-foreground text-sm">{exp.category}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{exp.amount.toFixed(2)} €</div>
                <div className="text-muted-foreground text-xs">{new Date(exp.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

