import LogoImg from '/logo.svg'

interface LogoProps {
  className?: string
  width?: number
}

export default function Logo({ className, width }: LogoProps) {
  return (
    <img
      src={LogoImg}
      alt="Logo"
      className={`transition ease-in-out hover:cursor-pointer hover:drop-shadow-md hover:duration-300 hover:scale-105 ${
        className || ''
      }`}
      width={width || 80}
      onClick={() => {
        window.location.href = '/'
      }}
    />
  )
}
