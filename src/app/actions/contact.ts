export async function sendContact(data: { fullname: string, phone: string, workType: string, comment?: string },) {
  const res = await fetch('/api/contact', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resData = await res.json()

  return resData
}