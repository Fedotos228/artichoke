'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCallRequest(phoneNumber: string) {
  try {
    const data = await resend.emails.send({
      from: 'Contact Site <onboarding@resend.dev>',
      to: ['tudor.onceanu@parsec.md'],  
      subject: 'Cerere nouă de apel',
      text: `Salut! Ai primit o cerere nouă de apel.\n\nNumăr de telefon: ${phoneNumber}`,
      html: `<p>Salut! Ai primit o cerere nouă de apel.</p><p><strong>Număr de telefon:</strong> ${phoneNumber}</p>`,
    });

    if (data.error) {
        return { success: false, error: data.error.message };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Eroare la trimiterea emailului' };
  }
}