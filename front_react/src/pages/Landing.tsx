import LandingHeader from '@/components/header/LandingHeader'
import { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

function Landing() {
  const needProgramList = [
    '/baekjoon.png',
    '/programmers.svg',
    '/swea.svg',
    '/logo/github/github-mark-white.png',
    '/notion.svg',
    '/discord.svg',
    '/vscode.svg',
    '/IntelliJ.svg',
  ]
  const handleGithubEmailSubmit = (e) => {
    e.preventDefault()
    alert('깃허브로 시작하기')
  }

  const backgroundImage = {
    backgroundImage:
      'linear-gradient(\
      165deg,\
      rgba(242, 221, 255, 1) 0%,\
      rgba(216, 211, 255, 0.9) 25%,\
      rgba(219, 216, 255, 1) 54%,\
      rgba(237, 214, 255, 1) 78%,\
      rgba(247, 224, 255, 0.9) 100%\
    )',
    backgroundAttachment: 'fixed',
  }

  const textRefs = useRef<HTMLDivElement[]>([])
  const biggerRef = useRef<HTMLDivElement>(null)
  const [rate, setRate] = useState(85)

  useEffect(() => {
    if (textRefs.current.length === 0) {
      return
    } else {
      textRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.opacity = '0'
          ref.style.transform = 'translateY(10px)'
        }
      })
    }
  }, [textRefs])

  useEffect(() => {
    const handleScroll = debounce(() => {
      textRefs.current.forEach((ref) => {
        if (ref) {
          const top = ref.getBoundingClientRect().top
          if (top < window.innerHeight - 100) {
            ref.style.opacity = '1'
            ref.style.transform = 'translateY(-10px)'
          } else {
            ref.style.opacity = '0'
            ref.style.transform = 'translateY(10px)'
          }
        }
      })
    }, 10)

    const handleBiggerScroll = () => {
      if (biggerRef.current) {
        const top = biggerRef.current.getBoundingClientRect().top
        const innerHeight = window.innerHeight
        if (window.scrollY > innerHeight && top - innerHeight > 0) {
          const distance = innerHeight * 2.5
          const normalizedDistance = (top - innerHeight) / distance
          const exponentialRate =
            1 + 99 * Math.exp(-10 * (1 - normalizedDistance))
          if (top === 0) {
            setRate(1)
            return
          }
          setRate(exponentialRate)
        }
        if (top > innerHeight * 3.5) {
          setRate(100)
        }
        if (top < window.innerHeight) setRate(1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleBiggerScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleBiggerScroll)
    }
  }, [])

  return (
    <>
      <LandingHeader />
      <div className="min-h-screen flex flex-col">
        <section style={backgroundImage}>
          <div className="xl:container xl:mx-auto px-24">
            <div className="min-h-[880px] h-lvh flex flex-col justify-center">
              <div className="flex flex-col">
                <div className="pb-10">
                  <h1 className="break-keep text-balance text-8xl font-bold text-darkNavy mb-6 max-md:text-6xl text-center">
                    알고리즘 스터디 여기서 함께
                  </h1>
                  <p className="break-keep text-3xl text-navy text-center">
                    실시간 온라인 알고리즘 스터디 플랫폼
                  </p>
                </div>
                <form onSubmit={handleGithubEmailSubmit}>
                  <div className="flex sm:flex-row flex-col justify-center">
                    <input
                      className="z-10 focus:ring-2 ring-inset focus:outline-none p-3 max-sm:rounded-md sm:rounded-l-md max-w-xl grow"
                      type="text"
                      placeholder="Github email address"
                    />
                    <button className="p-3 transition-all duration-200 hover:shadow-[0_10px_30px_-10px_rgba(161,106,230,1)] bg-darkNavy text-white w-40 max-sm:mt-4 max-sm:w-full max-sm:rounded-md sm:rounded-r-md bg-size-200 bg-pos-100 hover:bg-pos-0 bg-gradient-to-b from-vividPurple via-darkNavy to-darkNavy">
                      깃허브로 시작하기
                    </button>
                  </div>
                </form>
                <div className="max-sm:pt-10 pt-24 flex flex-col">
                  <h2 className="leading-tight break-keep text-balance max-md:text-4xl text-5xl font-bold text-navy text-center">
                    불편한 스터디는 이제 그만
                  </h2>
                  <h2 className="leading-tight break-keep text-balance max-md:text-4xl text-5xl font-bold text-navy text-center">
                    <p className="inline-block bg-gradient-to-r from-indigo-700 to-darkPurple text-transparent bg-clip-text">
                      Algowithme
                    </p>
                    로 간편하게 시작하세요
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="h-[350vh] bg-indigo-950">
          <div className="sticky top-0 h-[100vh] overflow-hidden">
            <div className="xl:container xl:mx-auto px-40 pt-40">
              <div className="flex justify-center items-center">
                <div className="grid grid-cols-4 grid-rows-2 gap-10 place-content-center w-fit">
                  {needProgramList.map((program, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center"
                    >
                      <img
                        src={program}
                        width={256}
                        alt="program"
                        className="rounded-2xl"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-[100vh] w-full absolute top-0 overflow-hidden flex items-center justify-center">
              <img
                src="/logo_reverse.svg"
                alt="logo_reverse"
                style={{ transform: `matrix(${rate}, 0, 0, ${rate}, 0, 0)` }}
                className="scale-[80]"
              />
            </div>
          </div>
        </section>
        <section ref={biggerRef} className="bg-[#f2ddec]">
          <div className="xl:container xl:mx-auto px-80">
            <div className="flex flex-col">
              <div
                // style={{ opacity: 0, transform: 'translateY(10px)' }}
                ref={(ref) => textRefs.current.push(ref)}
                className="mt-[calc(-50vh+185px)] font-bold text-6xl text-gray-600 transition duration-500 ease-in-out"
              >
                ALL IN ONE
              </div>
              <div className="flex-row"></div>
            </div>
          </div>
        </section>
        <footer className="bg-darkNavy pb-2">
          <div className="xl:container xl:mx-auto px-40 h-[1000px]">
            <div className="pt-32 font-bold text-5xl text-white">Footer</div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Landing
