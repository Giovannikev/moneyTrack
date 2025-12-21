import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>(["Alimentation", "Transport", "Abonnements", "Loisirs"])
  const [newCat, setNewCat] = useState("")

  const addCategory = () => {
    if (!newCat.trim()) return
    setCategories((prev) => Array.from(new Set([...prev, newCat.trim()])))
    setNewCat("")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="px-2">
        <h1 className="text-xl font-semibold">Catégories</h1>
        <p className="text-muted-foreground text-sm">Gérez vos catégories de dépense</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ajouter une catégorie</CardTitle>
          <CardDescription>Créez vos propres catégories</CardDescription>
        </CardHeader>
        <CardContent className="flex items-end gap-3">
          <Field className="flex-1">
            <FieldGroup>
              <FieldLabel>Nom</FieldLabel>
              <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Ex: Santé" />
            </FieldGroup>
          </Field>
          <Button onClick={addCategory}>Ajouter</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des catégories</CardTitle>
          <CardDescription>Personnalisez votre classification</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat} className="rounded-md border px-3 py-2 text-sm">
              {cat}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

