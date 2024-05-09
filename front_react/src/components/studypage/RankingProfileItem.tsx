const RankingProfileItem = () => {
  return (
    <div>
      <div
        className={` bg-white w-40 h-52 rounded-lg flex flex-col items-center p-4 mr-2`}
      >
        {/* gradient border */}
        <div className="h-[60%] flex items-center justify-center">
          <img
            src={'/bojlogo.png'}
            alt={'프사'}
            width={72}
            height={72}
            className="border rounded-full"
          />
        </div>
        <div className="h-[40%] flex items-center flex-col justify-around">
          <div className="font-bold">{'김지연'}</div>
          <div className="text-sm text-navy">{'1등'}</div>
        </div>
      </div>
    </div>
  )
}

export default RankingProfileItem
