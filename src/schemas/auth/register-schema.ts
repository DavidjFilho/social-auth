import { z } from "zod";
import { isValidCPF } from "@/lib/validations/cpf";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

function isValidDate(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);

  if (!day || !month || !year) return false;

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function isAdult(dateString: string) {
  const [day, month, year] = dateString.split("/").map(Number);

  if (!day || !month || !year) return false;

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
}

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Digite seu nome completo")
      .refine((value) => value.trim().split(/\s+/).length >= 2, {
        message: "Informe nome e sobrenome",
      }),

    birthDate: z
      .string()
      .min(1, "Informe sua data de nascimento")
      .refine((value) => value.replace(/\D/g, "").length === 8, {
        message: "Data de nascimento incompleta",
      })
      .refine((value) => isValidDate(value), {
        message: "Data de nascimento inválida",
      })
      .refine((value) => isAdult(value), {
        message: "Você precisa ter pelo menos 18 anos",
      }),

    email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),

    confirmEmail: z
      .string()
      .min(1, "Confirme seu e-mail")
      .email("E-mail inválido"),

    cpf: z
      .string()
      .min(1, "Informe seu CPF")
      .refine((value) => isValidCPF(value), {
        message: "CPF inválido",
      }),

    phone: z
      .string()
      .min(1, "Informe seu telefone")
      .refine(
        (value) => {
          const phone = value.replace(/\D/g, "");
          return phone.length === 10 || phone.length === 11;
        },
        {
          message: "Telefone inválido",
        },
      ),

    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(
        passwordRegex,
        "A senha deve conter 1 letra maiúscula, 1 minúscula e 1 caractere especial",
      ),

    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .superRefine((data, ctx) => {
    if (data.email !== data.confirmEmail) {
      ctx.addIssue({
        path: ["confirmEmail"],
        message: "Os e-mails devem ser iguais",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "As senhas devem ser iguais",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
