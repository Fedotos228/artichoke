import Image from 'next/image'

export default function Loading() {
  return (
    <div className="absolute inset-0 w-full h-dvh flex items-center justify-center bg-background ">
      <Image 
        src="/Logo.svg"
        alt="Loading logo"
        width={160}
        height={160}
      />
    </div>
  )
}