import LandingHeader from '@/components/header/LandingHeader'

function Landing() {
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
  }
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
        <section className="bg-indigo-950">
          <div className="xl:container xl:mx-auto px-40">
            <div className="flex flex-col">
              <div className="pt-32 font-bold text-5xl text-gray-400">
                All-in-One
              </div>
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
