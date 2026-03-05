import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string()
      .min(1, 'Email is required.')
      .check(z.email('Email formatting is incorrect.'))
      .trim(),
    password: z.string({ error: 'Password is required.' })
  })

export type LoginData = z.infer<typeof loginSchema>

export type LoginPayload = z.infer<typeof loginSchema>
