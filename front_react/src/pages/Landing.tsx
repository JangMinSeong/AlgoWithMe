import LandingHeader from '@/components/header/LandingHeader'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'

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
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_ID
      }&scope=repo%20project&login=${e.target[0].value}`,
    )
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
  const replacementRefs = useRef<HTMLDivElement[]>([])
  const biggerRef = useRef<HTMLDivElement>(null)
  const allInOneRef = useRef<HTMLDivElement>(null)
  const liveRef = useRef<HTMLDivElement>(null)
  const liveBottomRef = useRef<HTMLDivElement>(null)
  const grassRefs = useRef<HTMLDivElement[]>([])
  const [rate, setRate] = useState(85)

  useEffect(() => {
    if (replacementRefs.current.length === 0) {
      return
    } else {
      console.log(replacementRefs.current)
      replacementRefs.current.forEach((ref) => {
        if (ref) {
          ref.style.display = 'none'
        }
      })
    }
  }, [replacementRefs])

  useEffect(() => {
    const initScroll = debounce(() => {
      const top = liveRef.current.getBoundingClientRect().top
      if (top > window.innerHeight) {
        console.log('init')
        textRefs.current.forEach((ref) => {
          ref.style.display = 'block'
        })
        replacementRefs.current.forEach((ref) => {
          ref.style.display = 'none'
          ref.style.opacity = '0'
        })
      }

      grassRefs.current.forEach((ref) => {
        const top = ref.getBoundingClientRect().top
        const innerHeight = window.innerHeight
        if (top < (innerHeight / 4) * 3) {
          ref.style.opacity = '1'
          ref.style.transform = 'translate(0, -20px)'
        } else {
          ref.style.opacity = '0'
          ref.style.transform = 'translate(0, 0)'
        }
      })
    }, 10)

    const handleBiggerScroll = () => {
      if (biggerRef.current) {
        const top = biggerRef.current.getBoundingClientRect().top
        const innerHeight = window.innerHeight
        if (top - innerHeight < 200) {
          const distance = top - innerHeight
          const normalizedDistance = 1 - distance / 200
          allInOneRef.current.style.transform = `matrix(1, 0, 0, 1, 0, ${
            normalizedDistance * 50 > 50 ? 50 : normalizedDistance * 50
          })`
          allInOneRef.current.style.opacity = `${
            normalizedDistance > 1 ? 1 : normalizedDistance
          }`
        } else {
          allInOneRef.current.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
          allInOneRef.current.style.opacity = '0'
        }
        if (window.scrollY > innerHeight && top - innerHeight > 0) {
          const distance = innerHeight * 2.5
          const normalizedDistance = (top - innerHeight) / distance
          const exponentialRate =
            1 + 109 * Math.exp(-10 * (1 - normalizedDistance))
          if (top === 0) {
            setRate(1)
            return
          }
          setRate(exponentialRate)
        }
        if (top > innerHeight * 3.5) {
          setRate(110)
        }
        if (top < window.innerHeight) setRate(1)
      }
    }

    const handleLiveScroll = () => {
      if (liveBottomRef.current) {
        const top = liveBottomRef.current.getBoundingClientRect().top
        const innerHeight = window.innerHeight
        const distance = innerHeight * 3.5 - top
        if (distance > 0 && distance < innerHeight * 2.5) {
          const viewIndex = Math.floor(
            (distance / (innerHeight * 2.5)) * (textRefs.current.length + 1),
          )
          console.log(viewIndex)
          textRefs.current.forEach((ref, index) => {
            if (ref) {
              if (index < viewIndex) {
                ref.style.display = 'none'
                replacementRefs.current[index].style.display = 'block'
                setTimeout(() => {
                  replacementRefs.current[index].style.opacity = '1'
                }, 100)
              }
            }
          })
          replacementRefs.current.forEach((ref, index) => {
            if (ref) {
              if (index >= viewIndex) {
                setTimeout(() => {
                  replacementRefs.current[index].style.opacity = '0'
                }, 100)
                ref.style.display = 'none'
                textRefs.current[index].style.display = 'block'
              }
            }
          })
        }
      }
    }

    window.addEventListener('scroll', handleBiggerScroll)
    window.addEventListener('scroll', initScroll)
    window.addEventListener('scroll', handleLiveScroll)

    return () => {
      window.removeEventListener('scroll', handleBiggerScroll)
      window.removeEventListener('scroll', initScroll)
      window.removeEventListener('scroll', handleLiveScroll)
    }
  }, [])

  const items = Array.from({ length: 84 }, (_, index) => index + 1)

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
            <div className="h-[100vh] xl:container xl:mx-auto max-md:px-24 px-40 flex justify-center">
              <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-4 grid-rows-2 max-md:gap-5 gap-10 place-content-center w-fit">
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
                className="w-full"
              />
            </div>
          </div>
        </section>
        <section ref={biggerRef} className="bg-[#F2DDEC] pb-[200px] ">
          <div className="xl:container xl:mx-auto max-xl:px-40 px-80">
            <div className="flex flex-col">
              <div
                // style={{ opacity: 0, transform: 'translateY(10px)' }}
                ref={allInOneRef}
                className="z-20 mt-[calc(-50vh+185px)] flex flex-col"
              >
                <div className="text-8xl font-bold text-gray-600 pb-10">
                  ALL IN ONE
                </div>
                <div className="flex flex-row">
                  <div className="leading-normal break-keep text-2xl font-bold text-gray-400 w-1/2 pr-20">
                    새롭게 선보이는{' '}
                    <div className="break-keep inline text-gray-600">
                      차세대 온라인 스터디 통합 플랫폼,
                    </div>{' '}
                    이거 켜고, 저거 켜고, 복잡한 스터디 준비 과정은 이제 그만,{' '}
                    <div className="break-keep inline-block text-gray-600">
                      Algowithme
                    </div>
                    에서 코드 작성, 코드 공유, 공유 문서 작성, 음성 채팅 까지
                    제공하니까
                  </div>
                  <div className="flex flex-col w-1/2 gap-3">
                    <div className="text-gray-400 text-2xl font-bold">
                      다양한 문제 제공
                    </div>
                    <div className="text-gray-600 text-4xl font-bold">
                      백준, 프로그래머스, SWEA
                    </div>
                    <div className="text-gray-400 text-2xl font-bold pt-4">
                      네 가지 언어 지원
                    </div>
                    <div className="text-gray-600 text-4xl font-bold">
                      C, C++, JAVA, Python
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-row"></div>
            </div>
          </div>
        </section>
        <section ref={liveRef} className="bg-indigo-950 h-[350vh] pb-40">
          <div className="sticky top-0 h-lvh overflow-hidden">
            <div className="xl:container xl:mx-auto max-xl:px-40 px-80 h-full flex justify-center">
              <div className="flex flex-col gap-2 max-h-full justify-center">
                {/* Algowithme */}
                <div
                  ref={(ref) => {
                    textRefs.current[0] = ref
                  }}
                  className="text-xl text-gray-300"
                >
                  # Algowithme
                </div>
                <div
                  ref={(ref) => {
                    replacementRefs.current[0] = ref
                  }}
                  className="text-4xl text-gray-300 font-bold transition-all duration-1000 ease-in-out"
                >
                  Algowithme
                </div>
                {/* 구분선 */}
                <div
                  ref={(ref) => {
                    textRefs.current[1] = ref
                  }}
                  className="text-xl text-gray-300"
                >
                  ---
                </div>
                <div
                  ref={(ref) => {
                    replacementRefs.current[1] = ref
                  }}
                  className="w-full h-1 bg-gray-300 transition-all duration-1000 ease-in-out"
                ></div>
                {/* 마크다운 언어 지원 */}
                <div
                  ref={(ref) => {
                    textRefs.current[2] = ref
                  }}
                  className="text-xl text-gray-300"
                >
                  ## 마크다운 언어 지원
                </div>
                <div
                  ref={(ref) => {
                    replacementRefs.current[2] = ref
                  }}
                  className="text-2xl text-gray-300 font-bold transition-all duration-1000 ease-in-out"
                >
                  마크다운 언어 지원
                </div>

                {/* 문서 작성은 마크 다운 형식으로 간편하게 */}
                <div className="text-xl text-gray-300 flex flex-row gap-2">
                  문서 작성은
                  <div
                    ref={(ref) => {
                      textRefs.current[3] = ref
                    }}
                    className="inline text-xl text-gray-300"
                  >
                    **마크 다운**
                  </div>
                  <div
                    ref={(ref) => {
                      replacementRefs.current[3] = ref
                    }}
                    className="inline text-xl font-bold text-gray-300 transition-all duration-1000 ease-in-out"
                  >
                    마크 다운
                  </div>{' '}
                  형식으로 빠르고 간편하게
                </div>
                <div
                  ref={(ref) => {
                    textRefs.current[4] = ref
                  }}
                  className="text-xl text-gray-300"
                >
                  ## 실시간 문서 공유
                </div>
                <div
                  ref={(ref) => {
                    replacementRefs.current[4] = ref
                  }}
                  className="text-2xl text-gray-300 font-bold transition-all duration-1000 ease-in-out"
                >
                  실시간 문서 공유
                </div>
                {/* prettier-ignore */}
                <div
                  ref={(ref) => {
                    textRefs.current[5] = ref
                  }}
                  className="text-xl text-gray-300"
                >
                  ```<br />
                  #include &lt;stdio.h&gt;
                  <br />
                  <br />
                  int main()
                  <br />
                  &#123;
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;printf(&quot;Hello, world!&quot;);
                  <br />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;return 0;
                  <br />
                  &#125;
                  <br />
                  ```
                </div>
                <div
                  ref={(ref) => {
                    replacementRefs.current[5] = ref
                  }}
                  className="text-xl text-gray-300 transition-all duration-1000 ease-in-out"
                >
                  <div className="shadow-[0_0_34px_-9px_rgba(0,0,0,1)] rounded-md p-7 pr-20 bg-gray-800/80 w-fit">
                    <code>
                      <div className="inline text-orange-300">#include</div>{' '}
                      <div className="inline text-orange-700">
                        &lt;stdio.h&gt;
                      </div>
                      <br />
                      <br />
                      <div className="inline text-amber-200">int&nbsp;</div>
                      main()
                      <br />
                      &#123;
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <div className="inline text-amber-200">printf</div>(
                      <div className="inline text-lime-700">
                        &quot;Hello, world!&quot;
                      </div>
                      );
                      <div
                        ref={(ref) => {
                          textRefs.current[6] = ref
                        }}
                      />
                      <div
                        ref={(ref) => {
                          replacementRefs.current[6] = ref
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="inline text-amber-200">printf</div>(
                        <div className="inline text-lime-700">
                          &quot;Hello, ssafy!&quot;
                        </div>
                        <div className="inline relative">
                          );
                          <div className="absolute pb-4 inline-block h-7 w-[2px] bg-accent" />
                          <div className="absolute right-[-56px] top-[-5px] h-3 w-14 bg-accent " />
                          <div className="absolute right-[-54px] top-[-14px] text-black font-mono text-[12px] font-bold">
                            hyaanu
                          </div>
                        </div>
                      </div>
                      <div
                        ref={(ref) => {
                          textRefs.current[7] = ref
                        }}
                      />
                      <div
                        ref={(ref) => {
                          replacementRefs.current[7] = ref
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="inline text-amber-200">printf</div>(
                        <div className="inline text-lime-700">&quot;Hello,</div>
                        <div className="inline relative">
                          <div className="absolute pb-4 inline-block h-7 w-[2px] bg-blue-200" />
                          <div className="absolute right-[-56px] top-[-5px] h-3 w-14 bg-blue-200 " />
                          <div className="absolute right-[-54px] top-[-14px] text-black font-mono text-[12px] font-bold">
                            sarang
                          </div>
                        </div>
                      </div>
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;return 0;
                      <br />
                      &#125;
                      <br />
                    </code>
                  </div>
                </div>
                <div
                  ref={(ref) => {
                    textRefs.current[8] = ref
                  }}
                  className="text-xl text-gray-300"
                >
                  ## 음성 채팅 기능 제공
                </div>
                <div
                  ref={(ref) => {
                    replacementRefs.current[8] = ref
                  }}
                  className="text-2xl text-gray-300 font-bold transition-all duration-1000 ease-in-out"
                >
                  음성 채팅 기능 제공
                </div>
                <div className="text-xl text-gray-300">
                  소통까지 가능한 완벽한 실시간 온라인 스터디 통합 플랫폼
                </div>
              </div>
            </div>
          </div>
        </section>
        <div ref={liveBottomRef} />
        <section className="h-[180vh] bg-black">
          <div className="xl:container xl:mx-auto max-xl:px-40 px-80 flex flex-col justify-center items-center pt-48">
            <div
              ref={(ref) => {
                grassRefs.current.push(ref)
              }}
              className="transition duration-300 break-keep text-8xl font-bold text-white pb-20 text-center"
            >
              스터디의 마무리는 잔디로
            </div>
            <div
              ref={(ref) => {
                grassRefs.current.push(ref)
              }}
              className="w-fit h-fit transition duration-300"
            >
              <div className="grid grid-cols-12 gap-3">
                {items.map((item) => {
                  const rand = Math.floor(Math.random() * 5)
                  let colorFactor
                  switch (rand) {
                    case 0:
                      colorFactor = 'bg-[#161B22]'
                      break
                    case 1:
                      colorFactor = 'bg-[#0E4429]'
                      break
                    case 2:
                      colorFactor = 'bg-[#006D32]'
                      break
                    case 3:
                      colorFactor = 'bg-[#26A641]'
                      break
                    case 4:
                      colorFactor = 'bg-[#39D353]'
                      break
                    default:
                      colorFactor = 'bg-[#161B22]'
                      break
                  }
                  return (
                    <div
                      key={item}
                      className={`${colorFactor} h-6 w-6 rounded-md`}
                    ></div>
                  )
                })}
              </div>
            </div>

            <div
              ref={(ref) => {
                grassRefs.current.push(ref)
              }}
              className="break-keep text-3xl text-gray-400 pt-20 text-center transition duration-300"
            >
              <div className="inline break-keep text-3xl font-bold text-white pt-20 text-center">
                깃허브 연동
              </div>
              으로 클릭 몇 번이면 업로드 완료
            </div>
            <div
              ref={(ref) => {
                grassRefs.current.push(ref)
              }}
              className="break-keep text-3xl text-gray-400 pb-20 text-center transition duration-300"
            >
              마지막까지 편리한
              <p className="inline-block font-bold bg-gradient-to-r from-indigo-700 to-darkPurple text-transparent bg-clip-text">
                &nbsp;Algowithme
              </p>
            </div>
          </div>
        </section>
        <footer className="pb-2 h-[10vh] bg-black">
          <div className="xl:container xl:mx-auto px-40 flex flex-col items-center">
            <img src={'/logo.svg'} alt="logo" className="h-4" />
            <div className="text-md text-gray-700">
              Copyright &copy;Algowithme 2024, Algowithme. All Right Reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Landing
