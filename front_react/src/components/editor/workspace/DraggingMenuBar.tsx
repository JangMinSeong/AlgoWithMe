import {Editor} from "@tiptap/react";
import {Fragment, useEffect, useState} from "react";
import ColorPickerItem from "@/components/editor/workspace/ColorPickerItem.tsx";
import FontSizeControl from "@/components/editor/workspace/FontSizeControl.tsx";
import MenuItem from "@/components/editor/workspace/MenuItem.tsx";
import './MenuBar.scss'
interface MenuItemProps {
    icon: string
    title: string
    action: () => void
    isActive?: () => boolean
    type?: string
}

interface MenuBarProp {
    editor: Editor
    pageId: string
}

interface DraggingMenuBarProp extends MenuBarProp {
    isDragging: boolean
}

const DraggingMenuBar: React.FC<DraggingMenuBarProp> = ({ editor, pageId }) => {
    const [curEditor, setCurEditor] = useState<Editor | null>(null)
    const [draggedItems, setDraggedItems] = useState<MenuItemProps[]>([])

    useEffect(() => {
        setCurEditor(editor)
    }, [editor])

    useEffect(() => {
        if (!curEditor) return

        const newDraggedItems: MenuItemProps[] = [
            {
                icon: 'bold',
                title: 'Bold',
                action: () => curEditor.chain().focus().toggleBold().run(),
                isActive: () => curEditor.isActive('bold'),
            },
            {
                icon: 'italic',
                title: 'Italic',
                action: () => curEditor.chain().focus().toggleItalic().run(),
                isActive: () => curEditor.isActive('italic'),
            },
            {
                icon: 'strikethrough',
                title: 'Strike',
                action: () => curEditor.chain().focus().toggleStrike().run(),
                isActive: () => curEditor.isActive('strike'),
            },
            {
                icon: 'code-view',
                title: 'Code',
                action: () => curEditor.chain().focus().toggleCode().run(),
                isActive: () => curEditor.isActive('code'),
            },
            {
                icon: 'mark-pen-line',
                title: 'Highlight',
                action: () => curEditor.chain().focus().toggleHighlight().run(),
                isActive: () => curEditor.isActive('highlight'),
            },
            {
                icon: 'font-size',
                title: 'Font Size',
                action: () => { },
                isActive: () => curEditor.isActive('fontSize'),
            },
            {
                icon: 'palette-fill',
                title: 'Color',
                action: () => { },
                isActive: () => curEditor.isActive('color'),
            },
            {
                icon: 'h-1',
                title: 'Heading 1',
                action: () => curEditor.chain().focus().toggleHeading({ level: 1 }).run(),
                isActive: () => curEditor.isActive('heading', { level: 1 }),
            },
            {
                icon: 'h-2',
                title: 'Heading 2',
                action: () => curEditor.chain().focus().toggleHeading({ level: 2 }).run(),
                isActive: () => curEditor.isActive('heading', { level: 2 }),
            },
        ]

        setDraggedItems(newDraggedItems)
    }, [curEditor])

    return (
        <div className="editor__header border-b-[1px] border-blueishPurple z-10">
            {draggedItems.map((item, index) => (
                <Fragment key={index}>
                    {item.title === 'Color' ? (
                        <ColorPickerItem
                            editor={curEditor}
                            isActive={item.isActive}
                            icon={''}
                            title={''}
                            action={() => { }}
                        />
                    ) : item.title === 'Font Size' ? (
                        <FontSizeControl editor={curEditor} />
                    ) : (
                        <MenuItem {...item} />
                    )}
                </Fragment>
            ))}
        </div>
    )
}

export default DraggingMenuBar