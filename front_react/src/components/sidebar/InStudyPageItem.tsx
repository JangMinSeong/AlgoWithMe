import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import useSidebar from '@/hooks/useSidebar'
import DeleteButton from './DeleteButton'
import PageCreateButton from './PageCreateButton'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import EditDocModal from "@/components/sidebar/EditDocModal.tsx";
import {GoPencil} from "react-icons/go";
import fetch from "@/lib/fetch.ts"
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store.ts";
import {useWebSocket} from "@/hooks/useWebSocket.ts";

interface IPage {
  pageId: number
  title: string
  docs: boolean
  provider:string
  children: IPage[]
}

const InStudyPageItem = (props: {
  groupId: number,
  page: IPage,
  depth: number,
  provider:string
  onMovePage: (draggedId: number, targetId: number) => void
}) => {
  const navigate = useNavigate()
  const [isSubPagesOpen, setIsSubPagesOpen] = useState(false)
  const { setPId } = useSidebar()

  const menuItemWrapper =
      'px-2 h-10 hover:bg-navy hover:bg-opacity-30 transition-colors flex items-center text-sm'

  const pl = props.depth

  const [isDragOver, setIsDragOver] = useState(false);

  const [isModifierShowing, setIsModifierShowing] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false);
  const [pageTitle,setPageTitle] = useState(props.page.title)
  const pageList = useSelector((state: RootState) => state.sidebar.pageList)
  const {setPages} = useSidebar()
  const { sendUpdateMessage } = useWebSocket()

  useEffect(() => {
    setPageTitle(props.page.title);
  }, [props.page.title]);


  const handleEdit = () => {
    setIsModifierShowing(false);
    setShowEditModal(true);
  };

  const handleSubPageOpen = () => {
    setIsDragOver(false)
    setIsSubPagesOpen(!isSubPagesOpen)
    setPId(props.page.pageId)
  }

  const handleSave = async (newTitle) => {
    // 여기에서 페이지 제목을 업데이트하는 로직을 구현하세요.
    console.log(`New title: ${newTitle}`);
    setShowEditModal(false);
    // API 호출 등을 통해 서버에 저장
    await fetch(`/page/${props.page.pageId}`, {
      method: 'PUT',
      headers: {
        'content-Type' : 'application/json'
      },
      body: newTitle
    }).then(()=> {
      setPageTitle(newTitle)
      setPages(updatePageTitle(pageList, props.page.pageId, newTitle))
      sendUpdateMessage(`/app/study/${props.groupId}`, `updateTitle ${newTitle}`)
    })
  };

  const updatePageTitle = (pages: IPage[], pageId: number, newTitle: string): IPage[] => {
    return pages.map(page => {
      if (page.pageId === pageId) {
        return { ...page, title: newTitle };
      } else if (page.children) {
        return { ...page, children: updatePageTitle(page.children, pageId, newTitle) };
      }
      return page;
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, pageId: number) => {
    e.stopPropagation();  // 이벤트 버블링 방지
    e.dataTransfer.setData("pageId", pageId.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetPageId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const draggedId = parseInt(e.dataTransfer.getData("pageId"));
    if (draggedId !== targetPageId) {
      props.onMovePage(draggedId, targetPageId);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true); // 드래그 오버 시 상태 변경
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false); // 드래그가 떠날 때 상태 변경
  };
  const handleShowModifier = () => {
    setIsModifierShowing(true)
  }
  const handleUnShowModifier = () => {
    setIsModifierShowing(false)
  }

  const handleMovePage = () => {
    if (props.page.docs)
      navigate(`/${props.groupId}/docs/${props.page.pageId}`)
    else navigate(`/${props.groupId}/editor/${props.page.pageId}`)
  }

  return (
      <div
          draggable
          onDragStart={(e) => handleDragStart(e, props.page.pageId)}
          onDrop={(e) => handleDrop(e, props.page.pageId)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{paddingLeft: `${props.depth * (10/props.depth)}px`}}
          className={`draggable-item ${isDragOver ? 'bg-blue-100 border-gray-300' : 'bg-white'} border`}
      >
        <div
            onClick={handleMovePage}
            className={`${menuItemWrapper} ${isDragOver ? 'bg-blue-100 border-blue-500' : 'hover:bg-navy hover:bg-opacity-30'}`}
            onMouseOver={handleShowModifier}
            onMouseOut={handleUnShowModifier}
        >
          {
            props.page.docs ?
                <img
                    src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/File%20Folder.png"
                    alt="File Folder" width="25" height="25"/> :
                <img
                    src={`/${props.provider}.png`}
                    width={20}
                    height={20}
                    className="rounded-full mr-2"
                />
          }
          <div style={{width: 182 - pl}} className="truncate pl-2">
            {pageTitle ? pageTitle : '빈 페이지'}
          </div>
          {isModifierShowing && (
              <div className="flex items-center">
                {props.page.docs && (
                    <>
                      <GoPencil
                          className="w-4 mr-2 rounded-md justify-center items-center hover:bg-darkNavy hover:bg-opacity-20 transition-colors opacity-40"
                          onClick={handleEdit}/>

                      <PageCreateButton
                          pageId={props.page.pageId}
                          groupId={props.groupId}
                      />
                    </>
                )}
                <DeleteButton pageId={props.page.pageId}/>
                {props.page.docs && props.page.children.length ? (
                    <>
                      {isSubPagesOpen ? (
                          <MdKeyboardArrowUp onClick={handleSubPageOpen}/>
                      ) : (
                          <MdKeyboardArrowDown onClick={handleSubPageOpen}/>
                      )}
                    </>
                ) : null}
              </div>
          )}
            <EditDocModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleSave}
            />
        </div>
        {props.page.children?.length !== 0 &&
            isSubPagesOpen &&
            props.page.children?.map((el) => (
                <div>
                  <InStudyPageItem
                      groupId={props.groupId}
                      page={el}
                      key={el.pageId}
                      depth={props.depth + 1}
                      provider={el.provider}
                      onMovePage={props.onMovePage}
                  />
                </div>
            ))}
      </div>
  )
}

export default InStudyPageItem
