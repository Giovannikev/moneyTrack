"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { type FormEvent, useState } from "react"
import { signIn } from "@/services/auth"
import type { SignInFormData } from "@/types/auth.types"
import { useFormInput } from "@/hooks/use-form-input"
import { Loader } from "lucide-react"
import { toast } from "sonner"

const INITIAL_FORM_STATE: SignInFormData = {
  email: "",
  password: "",
}

export function SignInForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const { formData, updateField } = useFormInput(INITIAL_FORM_STATE)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { data, error: authError } = await signIn(formData.email, formData.password)

      if (authError) {
        setError(authError.message || "Une erreur est survenue lors de la connexion")
        return
      }

      if (data?.user) {
        navigate("/dashboard")
      }
      toast.success("Connexion réussie")
    } catch (err) {
      setError("Une erreur inattendue est survenue")
      console.error("Sign in error:", err)
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
                <h1 className="text-2xl font-bold">Connectez-vous à votre compte</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Entrez votre e-mail et votre mot de passe pour vous connecter
                </p>
              </div>

              {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

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

              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  disabled={isLoading}
                />
                <FieldDescription className="text-right">
                  <Link to="/reset-password">Mot de passe oublié ?</Link>
                </FieldDescription>
              </Field>

              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader className="animate-spin"/> : "Se connecter"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Pas de compte ? <Link to="/signup">S'inscrire</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image de connexion"
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
