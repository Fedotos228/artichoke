export async function sendContact(data: { fullname: string, phone: string, workType: string, comment?: string },) {
  const res = await fetch('/api/contact', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resData = await res.json().catch(() => null)

  // The API answers 400/500 with a JSON body too — without this the form
  // would report success for a message that was never sent.
  if (!res.ok) {
    throw new Error(resData?.message || `Contact request failed: ${res.status}`)
  }

  return resData
}