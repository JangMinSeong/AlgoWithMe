import A from '@/public/logo/3x/A@3x.png'
import l from '@/public/logo/3x/l@3x.png'
import g from '@/public/logo/3x/g@3x.png'
import o from '@/public/logo/3x/o@3x.png'
import W from '@/public/logo/3x/W@3x.png'
import i from '@/public/logo/3x/i@3x.png'
import t from '@/public/logo/3x/t@3x.png'
import h from '@/public/logo/3x/h@3x.png'
import M from '@/public/logo/3x/M@3x.png'
import e from '@/public/logo/3x/e@3x.png'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex gap-2">
      <Image src={A} alt="A" />
      <Image src={l} alt="l" />
      <Image src={g} alt="g" />
      <Image src={o} alt="o" />
      <Image src={W} alt="W" />
      <Image src={i} alt="i" />
      <Image src={t} alt="t" />
      <Image src={h} alt="h" />
      <Image src={M} alt="M" />
      <Image src={e} alt="e" />
    </div>
  )
}
