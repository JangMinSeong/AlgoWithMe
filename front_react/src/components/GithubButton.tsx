interface GithubButtonProps {
  login?: string
}

export default function GithubButton({ login }: GithubButtonProps) {
  // const { handleLogin } = useAuth()

  return (
    <button
      type="button"
      className="px-4 py-2 border border-stone-900 bg-transparent rounded-xl flex items-center space-x-2 hover:opacity-60"
      onClick={() => {
        const loginQuery = login ? `?login=${login}` : ''
        window.location.assign(
          `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_ID}${loginQuery}&scope=repo%20project`,
        )
      }}
    >
      <img
        src="/logo/github/github-mark.svg"
        alt="Github Logo"
        className="object-contain w-5"
      />
      <span className="font-medium text-sm text-stone-900">
        깃허브로 로그인
      </span>
    </button>
  )
}
