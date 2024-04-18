import Image from 'next/image'
const Avatar = () => {
  return (
    <div>
      <Image
        src="/bojlogo.png"
        alt="프로필"
        width={30}
        height={0}
        className="rounded-full"
      />
    </div>
  )
}

export default Avatar
