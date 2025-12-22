import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "sonner"
import { getSupabaseClient } from "@/services/supabase"
import { updateUserPassword, signOut } from "@/services/auth"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routes"

type ProfileForm = {
  email: string
  fullName: string
  avatarUrl: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const initial: ProfileForm = useMemo(
    () => ({
      email: user?.email || "",
      fullName: (user?.user_metadata as Record<string, unknown>)?.full_name as string || "",
      avatarUrl: (user?.user_metadata as Record<string, unknown>)?.avatar_url as string || "",
    }),
    [user]
  )
  const [form, setForm] = useState<ProfileForm>(initial)
  const [saving, setSaving] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changingPwd, setChangingPwd] = useState(false)

  useEffect(() => {
    setForm(initial)
  }, [initial])

  const update = (key: keyof ProfileForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      const supabase = getSupabaseClient()
      const updates: Parameters<typeof supabase.auth.updateUser>[0] = {
        data: {
          full_name: form.fullName,
          avatar_url: form.avatarUrl,
        },
      }
      if (form.email && form.email !== user?.email) {
        updates.email = form.email
      }
      const { error } = await supabase.auth.updateUser(updates)
      if (error) throw error
      toast.success("Profil mis à jour")
    } catch {
      toast.error("Échec de la mise à jour du profil")
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    try {
      if (!password || password !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas")
        return
      }
      setChangingPwd(true)
      const { error } = await updateUserPassword(password)
      if (error) throw error
      setPassword("")
      setConfirmPassword("")
      toast.success("Mot de passe mis à jour")
    } catch {
      toast.error("Échec de la mise à jour du mot de passe")
    } finally {
      setChangingPwd(false)
    }
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error("Échec de la déconnexion")
      return
    }
    navigate(ROUTES.SIGNIN)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
          <CardDescription>Votre identité et vos coordonnées</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14 rounded-lg">
              <AvatarImage src={form.avatarUrl} alt={form.fullName || user?.email || ""} />
              <AvatarFallback className="rounded-lg">{(form.fullName || user?.email || "").slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Field className="flex-1">
              <FieldGroup>
                <FieldLabel>Avatar URL</FieldLabel>
                <Input value={form.avatarUrl} onChange={(e) => update("avatarUrl", e.target.value)} placeholder="https://..." />
              </FieldGroup>
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldGroup>
                <FieldLabel>Nom complet</FieldLabel>
                <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Votre nom" />
              </FieldGroup>
            </Field>
            <Field>
              <FieldGroup>
                <FieldLabel>Email</FieldLabel>
                <FieldDescription>Une confirmation peut être requise</FieldDescription>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@exemple.com" />
              </FieldGroup>
            </Field>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveProfile} disabled={saving}>Enregistrer</Button>
            <Button variant="outline" onClick={() => setForm(initial)} disabled={saving}>Réinitialiser</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sécurité</CardTitle>
          <CardDescription>Mettre à jour votre mot de passe</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldGroup>
                <FieldLabel>Nouveau mot de passe</FieldLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FieldGroup>
            </Field>
            <Field>
              <FieldGroup>
                <FieldLabel>Confirmer</FieldLabel>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </FieldGroup>
            </Field>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleChangePassword} disabled={changingPwd}>Mettre à jour</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>Gérer votre session actuelle</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Connecté en tant que {user?.email}</div>
          <Button variant="destructive" onClick={handleSignOut}>Se déconnecter</Button>
        </CardContent>
      </Card>
    </div>
  )
}
