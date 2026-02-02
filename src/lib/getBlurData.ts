import { getPlaiceholder } from 'plaiceholder'

export async function getBlurData(src: string): Promise<string | null> {
  try {
    if (!src) return null
    const res = await fetch(src)

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
    }

    const arrayBuffer = await res.arrayBuffer()

    const buffer = Buffer.from(arrayBuffer)

    const { base64 } = await getPlaiceholder(buffer)

    return base64
  } catch (err) {
    console.log('Error to generate blur', err)
  }

  return null
}