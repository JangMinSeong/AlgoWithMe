interface UserInfo {
  id: number
  nickname: string
  imageUrl: string
}

const Avatar = (props: { userInfo: UserInfo; click?: () => void; clickList?: (id:number) => void }) => {
  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (props.click) {
      props.click();
    } else if (props.clickList) {
      props.clickList(props.userInfo.id);
    }
  };

  return (
    <div
      className={`border border-gray-300 bg-transparent rounded-full mr-2`}
    >
      <img
        src={props.userInfo.imageUrl}
        alt="프로필"
        width={30}
        height={30}
        className={`rounded-full ${!props.click && "transition-transform duration-300 ease-in-out hover:scale-125" }`}
        onClick={handleClick}
      />
    </div>
  )
}

export default Avatar
