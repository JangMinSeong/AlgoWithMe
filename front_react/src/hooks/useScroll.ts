import { useEffect, useState } from 'react'

export const useScroll = () => {
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
  })
  const onScroll = () => {
    setLocation({ y: window.scrollY, x: window.scrollX })
  }
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return location
}
