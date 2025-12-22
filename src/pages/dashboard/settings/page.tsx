import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModeToggle } from "@/components/dark-mode/mode-toggle"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Apparence</CardTitle>
          <CardDescription>Thème et affichage</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <ModeToggle />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Général</CardTitle>
          <CardDescription>Devise et langue</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldGroup>
              <FieldLabel>Devise</FieldLabel>
              <Select defaultValue="EUR">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>
          </Field>
          <Field>
            <FieldGroup>
              <FieldLabel>Langue</FieldLabel>
              <Select defaultValue="fr">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </FieldGroup>
          </Field>
        </CardContent>
      </Card>
    </div>
  )
}

