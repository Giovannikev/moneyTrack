"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, type FormEvent } from "react"
import { sendPasswordResetEmail, updateUserPassword } from "@/services/auth"
import { getSupabaseClient } from "@/services/supabase"
import type { ResetPasswordFormData } from "@/types/auth.types"
import { useFormInput } from "@/hooks/use-form-input"

const INITIAL_FORM_STATE: ResetPasswordFormData = {
  email: "",
  newPassword: "",
  confirmNewPassword: "",
  message: "",
}

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const { formData, updateField } = useFormInput(INITIAL_FORM_STATE)
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const supabase = getSupabaseClient()

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, _session) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsPasswordRecovery(true)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const validatePasswordMatch = (): boolean => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return false
    }
    return true
  }

  const handleSendResetEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const redirectUrl = `${window.location.origin}/reset-password`
      const { error: authError } = await sendPasswordResetEmail(formData.email, redirectUrl)

      if (authError) {
        setError(authError.message || "Erreur lors de l'envoi de l'email")
        return
      }

      updateField("message", "Un lien de réinitialisation a été envoyé à votre adresse e-mail.")
    } catch (err) {
      setError("Une erreur inattendue est survenue")
      console.error("Reset email error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (!validatePasswordMatch()) {
      return
    }

    setIsLoading(true)

    try {
      const { error: authError } = await updateUserPassword(formData.newPassword)

      if (authError) {
        setError(authError.message || "Erreur lors de la mise à jour du mot de passe")
        return
      }

      updateField("message", "Votre mot de passe a été mis à jour avec succès. Redirection...")
      setTimeout(() => navigate("/signin"), 2000)
    } catch (err) {
      setError("Une erreur inattendue est survenue")
      console.error("Update password error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = isPasswordRecovery ? handleUpdatePassword : handleSendResetEmail

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Réinitialiser votre mot de passe</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  {isPasswordRecovery
                    ? "Entrez votre nouveau mot de passe ci-dessous."
                    : "Entrez votre adresse e-mail pour recevoir un lien de réinitialisation."}
                </p>
              </div>

              {formData.message && (
                <div className="rounded-md bg-green-500/10 p-3 text-center text-sm text-green-600">
                  {formData.message}
                </div>
              )}

              {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

              {!isPasswordRecovery ? (
                <Field>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    disabled={isLoading}
                  />
                </Field>
              ) : (
                <>
                  <Field>
                    <FieldLabel htmlFor="new-password">Nouveau mot de passe</FieldLabel>
                    <Input
                      id="new-password"
                      type="password"
                      required
                      value={formData.newPassword}
                      onChange={(e) => updateField("newPassword", e.target.value)}
                      disabled={isLoading}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-new-password">Confirmer le nouveau mot de passe</FieldLabel>
                    <Input
                      id="confirm-new-password"
                      type="password"
                      required
                      value={formData.confirmNewPassword}
                      onChange={(e) => updateField("confirmNewPassword", e.target.value)}
                      disabled={isLoading}
                    />
                  </Field>
                </>
              )}

              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Traitement..."
                    : isPasswordRecovery
                      ? "Mettre à jour le mot de passe"
                      : "Envoyer le lien de réinitialisation"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                <Link to="/signin">Retour à la connexion</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image de réinitialisation"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        En cliquant sur continuer, vous acceptez nos <a href="#">Conditions d'utilisation</a> et notre{" "}
        <a href="#">Politique de confidentialité</a>.
      </FieldDescription>
    </div>
  )
}
