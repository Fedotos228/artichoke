export async function sendCallRequest(data: { phone: string }) {
  const res = await fetch('/api/sent-call-request', {
    method: "POST",
    body: JSON.stringify(data.phone),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const resData = await res.json()

  return resData
}