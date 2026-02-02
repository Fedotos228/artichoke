'use server'

import { ContactFormSchema } from '@/components/forms/schemas/contact-form.schema'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

type ContactFormData = z.infer<typeof ContactFormSchema>

export async function sendContactForm(data: ContactFormData) {
  const result = ContactFormSchema.safeParse(data)

  if (!result.success) {
    return { success: false, error: "Date invalide" }
  }

  try {
    const { fullname, phone, workType, comment } = result.data

    await resend.emails.send({
      from: 'Contact Site <onboarding@resend.dev>',
      to: ['email-ul-tau@gmail.com'],
      subject: `Mesaj nou de la ${fullname}`,
      html: `
        <h2>Detalii contact</h2>
        <p><strong>Nume:</strong> ${fullname}</p>
        <p><strong>Telefon:</strong> ${phone}</p>
        <p><strong>Tip lucrare:</strong> ${workType}</p>
        <p><strong>Comentariu:</strong></p>
        <blockquote style="background: #f9f9f9; padding: 10px; border-left: 3px solid #ccc;">
          ${comment || "Fără comentariu"}
        </blockquote>
      `,
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Eroare la trimitere' }
  }
}