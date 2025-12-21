import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type FormState = {
  label: string
  amount: string
  category: string
  date: string
  note: string
}

const initialState: FormState = {
  label: "",
  amount: "",
  category: "",
  date: new Date().toISOString().slice(0, 10),
  note: "",
}

export default function NewExpensePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(initialState)
  const [loading, setLoading] = useState(false)

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const submit = async () => {
    try {
      setLoading(true)
      navigate(ROUTES.DASHBOARD_EXPENSES)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle dépense</CardTitle>
          <CardDescription>Ajoutez une dépense</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <FieldGroup>
              <FieldLabel>Libellé</FieldLabel>
              <Input value={form.label} onChange={(e) => update("label", e.target.value)} placeholder="Ex: Courses" />
            </FieldGroup>
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldGroup>
                <FieldLabel>Montant</FieldLabel>
                <Input type="number" inputMode="decimal" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="0.00" />
              </FieldGroup>
            </Field>
            <Field>
              <FieldGroup>
                <FieldLabel>Catégorie</FieldLabel>
                <Select value={form.category} onValueChange={(v) => update("category", v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alimentation">Alimentation</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Abonnements">Abonnements</SelectItem>
                    <SelectItem value="Loisirs">Loisirs</SelectItem>
                  </SelectContent>
                </Select>
              </FieldGroup>
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldGroup>
                <FieldLabel>Date</FieldLabel>
                <Input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} />
              </FieldGroup>
            </Field>
            <Field>
              <FieldGroup>
                <FieldLabel>Note</FieldLabel>
                <FieldDescription>Optionnel</FieldDescription>
                <Input value={form.note} onChange={(e) => update("note", e.target.value)} placeholder="Détails" />
              </FieldGroup>
            </Field>
          </div>
          <div className="flex gap-2">
            <Button onClick={submit} disabled={loading}>Enregistrer</Button>
            <Button variant="outline" onClick={() => navigate(-1)}>Annuler</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

