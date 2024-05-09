const Member = () => {
  return (
    <div className=" bg-white flex w-fit min-w-48 px-4 py-4 rounded-lg border border-blueishPurple border-opacity-30 shadow-foggyBlue mb-2 items-center">
      <img
        src="/bojlogo.png"
        alt="멤버 프로필 이미지"
        width={40}
        height={40}
        className="rounded-full mr-2 "
      />
      <div className="mr-2 w-full flex justify-center">김지연</div>
    </div>
  )
}

export default Member
