import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

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
      subject: `Message request from ${data.phone}`,
      text: `Message request from ${data.phone}`,
      html: `<p><strong>Tel:</strong> ${data.phone}</p>`,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email trimis cu succes!" }, { status: 200 })

  } catch (error) {
    console.error("Eroare Nodemailer:", error)
    return NextResponse.json({ message: "Eroare la trimiterea email-ului" }, { status: 500 })
  }
}