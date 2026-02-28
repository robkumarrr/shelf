import { z } from 'zod'

export const registrationSchema = z
  .object({
    name: z
      .string({ error: 'Username is required.' })
      .min(5, { message: 'Username is not long enough.' })
      .trim(),
    email: z.email({ error: 'Email formatting is incorrect.' }).trim(),
    password: z
      .string({ error: 'Password is required.' })
      .min(8, { message: 'Password is not long enough.' }),
    password_confirmation: z.string({ error: 'Password confirmation is required.' }),
  })
  .refine((regForm) => regForm.password === regForm.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  })

export type RegistrationData = z.infer<typeof registrationSchema>

export type RegisterPayload = Omit<RegistrationData, 'password_confirmation'>
