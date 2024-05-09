const InactiveProfileItem = () => {
  return (
    <div className={`relative p-[2px] w-fit rounded-2xl mr-2 bg-background`}>
      <div
        className={`bg-white w-40 h-52 rounded-2xl flex flex-col items-center p-4`}
      >
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
          <div className="text-xs text-darkNavy">님을 기다리고 있어요</div>
        </div>
      </div>
      <div className="bg-background absolute w-full h-full top-0 left-0 bg-opacity-40"></div>
    </div>
  )
}

export default InactiveProfileItem
