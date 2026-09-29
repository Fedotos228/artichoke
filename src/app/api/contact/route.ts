import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const contactSchema = z.object({
  fullname: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(1).max(50),
  workType: z.string().trim().min(1).max(200),
  comment: z.string().trim().max(5000).optional().default(''),
})

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// Strip CR/LF so user input can never inject extra mail headers via the subject.
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ')

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ message: 'Date invalide' }, { status: 400 })
  }

  const { EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD } = process.env

  if (!EMAIL_SERVER_HOST || !EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD) {
    console.error('Contact: email server env vars are not configured')
    return NextResponse.json({ message: 'Eroare la trimiterea email-ului' }, { status: 500 })
  }

  const { fullname, phone, workType, comment } = parsed.data
  const safe = {
    fullname: escapeHtml(fullname),
    phone: escapeHtml(phone),
    workType: escapeHtml(workType),
    comment: escapeHtml(comment),
  }

  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_SERVER_HOST,
      port: parseInt(EMAIL_SERVER_PORT || '587', 10),
      secure: true,
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
      },
    })

    const mailOptions = {
      from: EMAIL_SERVER_USER,
      to: 'raileanu.ivann@gmail.com',
      subject: singleLine(`Solicitare nouă: ${workType} - ${fullname}`),
      // Varianta Text (pentru dispozitive care nu suportă HTML)
      text: `Nume: ${fullname}\nTelefon: ${phone}\nTip Lucrare: ${workType}\nComentariu: ${comment}`,
      // Varianta HTML (Design-ul)
      html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Solicitare Contact Nouă</h1>
          </div>

          <div style="padding: 20px; color: #333; line-height: 1.6;">
              <p>Ai primit o nouă cerere de pe site-ul tău. Iată detaliile:</p>

              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Nume complet:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${safe.fullname}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">
                          <a href="tel:${safe.phone}" style="color: #2563eb; text-decoration: none;">${safe.phone}</a>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Tip Lucrare:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">
                          <span style="background: #e1effe; color: #1e42af; padding: 4px 8px; border-radius: 4px; font-size: 14px;">
                              ${safe.workType}
                          </span>
                      </td>
                  </tr>
              </table>

              <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
                  <p style="margin: 0 0 10px 0; font-weight: bold;">Comentariu client:</p>
                  <p style="margin: 0; font-style: italic; color: #555;">"${safe.comment}"</p>
              </div>
          </div>

          <div style="background-color: #f3f4f6; color: #9ca3af; padding: 10px; text-align: center; font-size: 12px;">
              Acest email a fost trimis automat de sistemul de contact Next.js.
          </div>
      </div>
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email trimis cu succes!" }, { status: 200 })

  } catch (error) {
    console.error("Eroare Nodemailer:", error)
    return NextResponse.json({ message: "Eroare la trimiterea email-ului" }, { status: 500 })
  }
}
