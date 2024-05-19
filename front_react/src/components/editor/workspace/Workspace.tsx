import '@/components/editor/workspace/styles.scss'
import React, { useEffect, useState, useRef } from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import MenuBar from '@/components/editor/workspace/MenuBar'
import { CSSTransition } from 'react-transition-group'
import DraggingMenuBar from "@/components/editor/workspace/DraggingMenuBar";
import { MdMenu } from "react-icons/md";

interface WorkSpaceProps {
    editor: Editor
    pageId: string
}

const WorkSpace: React.FC<WorkSpaceProps> = ({ editor, pageId }) => {
    const [curEditor, setCurEditor] = useState<Editor | null>(null)
    const [showMenuBar, setShowMenuBar] = useState<boolean>(false)
    const [selectionRect, setSelectionRect] = useState<{ top: number, left: number } | null>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const workspaceRef = useRef<HTMLDivElement>(null)
    const [showTopMenuBar, setShowTopMenuBar] = useState<boolean>(false)

    const [curTop, setCurTop] = useState<number>(0)
    const [curLeft, setCurLeft] = useState<number>(0)

    useEffect(() => {
        setCurEditor(editor)
    }, [editor])

    useEffect(() => {
        if (!curEditor) return

        const handleSelectionChange = () => {
            const selection = document.getSelection()
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0)
                const rect = range.getBoundingClientRect()
                const selectedNode = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode

                const isTableCell = selectedNode.closest('td') || selectedNode.closest('th')
                const isImage = selectedNode.closest('img')

                if (!range.collapsed && workspaceRef.current?.contains(selection.anchorNode) && !isTableCell && !isImage) {
                    setCurTop(rect.top + window.scrollY)
                    setCurLeft(rect.left + window.scrollX)
                    setSelectionRect({ top: rect.top + window.scrollY, left: rect.left + window.scrollX })
                    setIsDragging(true)
                    setShowMenuBar(true)
                } else if(!range.collapsed && !workspaceRef.current?.contains(selection.anchorNode)){
                    setSelectionRect(null)
                    setShowMenuBar(false)
                    curEditor.commands.focus("end")
                } else {
                    setSelectionRect(null)
                    setShowMenuBar(false)
                }
            } else {
                setSelectionRect(null)
                setShowMenuBar(false)
            }
        }

        document.addEventListener('selectionchange', handleSelectionChange)
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange)
        }
    }, [curEditor])

    const handleEditorClick = (event: React.MouseEvent) => {
        setShowTopMenuBar(false)
        if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
            setSelectionRect(null)
            setShowMenuBar(false)
        }
        if (event.type === 'scroll') {
            setSelectionRect(null)
            setShowMenuBar(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleEditorClick)
        document.addEventListener('scroll', handleEditorClick, true) // true to capture event during the capture phase
        return () => {
            document.removeEventListener('click', handleEditorClick)
            document.removeEventListener('scroll', handleEditorClick, true)
        }
    }, [])

    const toggleTopMenuBar = (e) => {
        e.stopPropagation()
        setShowTopMenuBar(!showTopMenuBar)
    }

    return (
        <div className="editor w-full h-full" ref={workspaceRef}>
            <div className="relative top-bar-container">
                <MdMenu
                    className="w-7 h-7 absolute right-2 top-0 m-2 bg-transparent text-black hover:bg-navy p-1 rounded z-10"
                    onClick={(e)=>toggleTopMenuBar(e)}
                >
                </MdMenu>
                <CSSTransition
                    in={showTopMenuBar}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div className="absolute top-2 right-12">
                        <MenuBar editor={curEditor!} pageId={pageId} />
                    </div>
                </CSSTransition>
            </div>

            <CSSTransition
                in={showMenuBar && selectionRect !== null}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <div className="bg-white z-10 rounded-md" style={{
                    position: 'absolute',
                    top: selectionRect ? `${selectionRect.top - 35}px` : curTop - 35,
                    left: selectionRect ? `${selectionRect.left}px` : curLeft
                }}>
                    <DraggingMenuBar editor={curEditor!} pageId={pageId} isDragging={true}/>
                </div>
            </CSSTransition>
            <EditorContent className="editor__content" editor={curEditor} />

            <style>{`
                .fade-enter {
                    opacity: 0;
                    transform: scale(0.95);
                }
                .fade-enter-active {
                    opacity: 1;
                    transform: scale(1);
                    transition: opacity 300ms, transform 300ms;
                }
                .fade-exit {
                    opacity: 1;
                    transform: scale(1);
                }
                .fade-exit-active {
                    opacity: 0;
                    transform: scale(0.95);
                    transition: opacity 300ms, transform 300ms;
                }
            `}</style>
        </div>
    )
}

export default WorkSpace
