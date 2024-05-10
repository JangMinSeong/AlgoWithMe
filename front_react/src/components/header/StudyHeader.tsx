import { BrowserRouter as Router, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '/logo.svg'
import Avatar from './Avatar'
import Timer from './Timer'
import SideBarButton from '../sidebar/SideBarButton'
import GroupCall from '../groupcall/GroupCall'

const StudyHeader = () => {

  return (
    <div className="fixed z-10 top-2 left-2 w-[98vw] h-12 flex justify-between items-center bg-white bg-opacity-50 rounded-xl px-5">
      <div className="flex items-center w-1/4">
        <SideBarButton />
        <Link to="/main">
          <img src={Logo} alt="로고" width={80} height={0} />
        </Link>
      </div>
      <div className="flex items-center">
        <Avatar />
        <GroupCall />
      </div>
      <div className="flex items-center">
        <Timer />
        <Avatar />
      </div>
    </div>
  )
}

export default StudyHeader
