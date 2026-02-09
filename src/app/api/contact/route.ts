import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { fullname, phone, workType, comment } = await request.json()

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: 'raileanu.ivann@gmail.com',
      subject: `Solicitare nouă: ${workType} - ${fullname}`,
      // Varianta Text (pentru dispozitive care nu suportă HTML)
      text: `Nume: ${fullname}\nTelefon: ${phone}\nTip Lucrare: ${workType}\nComentariu: ${comment}`,
      // Varianta HTML (Design-ul)xs
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
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">${fullname}</td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">
                          <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                      </td>
                  </tr>
                  <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Tip Lucrare:</td>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">
                          <span style="background: #e1effe; color: #1e42af; padding: 4px 8px; border-radius: 4px; font-size: 14px;">
                              ${workType}
                          </span>
                      </td>
                  </tr>
              </table>

              <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
                  <p style="margin: 0 0 10px 0; font-weight: bold;">Comentariu client:</p>
                  <p style="margin: 0; font-style: italic; color: #555;">"${comment}"</p>
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