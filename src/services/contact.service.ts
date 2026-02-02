import { ExtendedSchema } from '@/components/forms/request-call'
import { wpFetch } from '@/lib/wpClient'
import z from 'zod'

export async function requestCallForm(data: z.infer<typeof ExtendedSchema>) {
  const { phone } = data
  const res = await wpFetch<any>(
    '/1461b91/feedback',
    {
      method: "POST",
      body: phone
    },
    process.env.NEXT_PUBLIC_WP_FORM_URL as string
  )

  if (!res) {
    throw new Error("Cant send req call")
  }

  return res
}