import { BrowserRouter as Router, Link } from 'react-router-dom';
const SideBarItem = ({ groupName }: { groupName: string }) => {
  return (
    <div className="hover:bg-navy hover:bg-opacity-30 transition-colors rounded-lg h-10 flex items-center pl-4">
      <Link to={`/study/${'스터디번호'}`}>{groupName}</Link>
    </div>
  )
}

export default SideBarItem
