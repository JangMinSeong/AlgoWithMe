import Image from 'next/image'
import AWM from '@/public/logo/960w/AWM@960px.png'

export default function Logo() {
  return (
    <div className="flex gap-2">
      <Image src={AWM} alt="Logo" className="h-24 object-contain" />
    </div>
  )
}
