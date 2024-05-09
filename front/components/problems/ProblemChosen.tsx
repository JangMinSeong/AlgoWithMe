const ProblemChosen = () => {
  return (
    <div>
      <div className="font-bold mb-2">선택된 문제</div>

      <div
        className={`w-full flex bg-gradient-to-br from-primary/50 via-secondary/50 to-blueishPurple/50 rounded-lg`}
      >
        <div className="flex grow bg-white h-[72px] items-center px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue hover:bg-dimmedPurple hover:bg-opacity-100 hover:border-opacity-0 transition-colors justify-between">
          <Image
            src={providerLogo[prov]}
            alt="로고"
            width={20}
            height={20}
            className="rounded-full mr-4 "
          />
          <div className="mr-2 w-[80%]">
            {problemInfo.number}
            {problemInfo.name}
          </div>
          <a
            target="_blank"
            href={problemInfo.url}
            rel="noreferrer"
            aria-label="문제 링크"
          >
            <BiLinkExternal />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProblemChosen
