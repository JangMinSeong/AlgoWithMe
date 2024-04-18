import Image from 'next/image'
const CallAvatar = () => {
  return (
    <div className="flex">
      <Image
        src="/programmers.png"
        alt="avatar"
        width={40}
        height={0}
        className="p-2 rounded-full"
      />
      <Image
        src="/programmers.png"
        alt="avatar"
        width={40}
        height={0}
        className="p-2 rounded-full"
      />
    </div>
  )
}

export default CallAvatar
