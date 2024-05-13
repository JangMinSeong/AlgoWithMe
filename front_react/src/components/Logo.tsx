import LogoImg from '/logo.svg'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <img
      src={LogoImg}
      alt="Logo"
      className={`hover:cursor-pointer ${className || ''}`}
      width={80}
      onClick={() => {
        window.location.href = '/'
      }}
    />
  )
}
