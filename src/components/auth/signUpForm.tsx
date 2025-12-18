"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { type FormEvent, useState } from "react"
import { signUp } from "@/services/auth"
import type { SignUpFormData } from "@/types/auth.types"
import { useFormInput } from "@/hooks/use-form-input"

const INITIAL_FORM_STATE: SignUpFormData = {
  email: "",
  password: "",
  fullName: "",
}

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const { formData, handleChange } = useFormInput(INITIAL_FORM_STATE)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setIsLoading(true)

    try {
      const { data, error: authError } = await signUp(formData.email, formData.password, formData.fullName)

      if (authError) {
        setError(authError.message || "Une erreur est survenue lors de l'inscription")
        return
      }

      if (data?.user) {
        setSuccessMessage("Veuillez vérifier votre email pour activer votre compte")
        setTimeout(() => navigate("/signin"), 3000)
      }
    } catch (err) {
      setError("Une erreur inattendue est survenue")
      console.error("Sign up error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Créer votre compte</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Entrez votre email ci-dessous pour créer votre compte
                </p>
              </div>

              {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

              {successMessage && (
                <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600">{successMessage}</div>
              )}

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="fullName">Nom complet</FieldLabel>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Création..." : "Créer un compte"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Vous avez déjà un compte ? <Link to="/signin">Se connecter</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image d'inscription"
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
