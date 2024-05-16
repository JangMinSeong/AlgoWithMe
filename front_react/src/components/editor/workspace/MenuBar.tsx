import './MenuBar.scss'
import React, { Fragment, useEffect, useState } from 'react'
import ColorPickerItem from '@/components/editor/workspace/ColorPickerItem'
import FontSizeControl from '@/components/editor/workspace/FontSizeControl'
import MenuItem from './MenuItem'
import { Editor } from '@tiptap/react'
import fetch from '@/lib/fetch.ts'

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

const MenuBar: React.FC<MenuBarProp> = ({ editor, pageId }) => {
  const [curEditor, setCurEditor] = useState<Editor | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([])

  useEffect(() => {
    setCurEditor(editor)
  }, [editor])

  useEffect(() => {
    if (!curEditor) return

    const items: MenuItemProps[] = [
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
        action: () => {},
        isActive: () => curEditor.isActive('fontSize'),
      },
      {
        icon: 'palette-fill',
        title: 'Color',
        action: () => {},
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
      {
        icon: 'paragraph',
        title: 'Paragraph',
        action: () => curEditor.chain().focus().setParagraph().run(),
        isActive: () => curEditor.isActive('paragraph'),
      },
      {
        icon: 'list-unordered',
        title: 'Bullet List',
        action: () => curEditor.chain().focus().toggleBulletList().run(),
        isActive: () => curEditor.isActive('bulletList'),
      },
      {
        icon: 'list-ordered',
        title: 'Ordered List',
        action: () => curEditor.chain().focus().toggleOrderedList().run(),
        isActive: () => curEditor.isActive('orderedList'),
      },
      {
        icon: 'list-check-2',
        title: 'Task List',
        action: () => curEditor.chain().focus().toggleTaskList().run(),
        isActive: () => curEditor.isActive('taskList'),
      },
      {
        icon: 'code-box-line',
        title: 'Code Block',
        action: () => curEditor.chain().focus().toggleCodeBlock().run(),
        isActive: () => curEditor.isActive('codeBlock'),
      },
      {
        icon: 'double-quotes-l',
        title: 'Blockquote',
        action: () => curEditor.chain().focus().toggleBlockquote().run(),
        isActive: () => curEditor.isActive('blockquote'),
      },
      {
        icon: 'separator',
        title: 'Horizontal Rule',
        action: () => curEditor.chain().focus().setHorizontalRule().run(),
      },
      {
        icon: 'text-wrap',
        title: 'Hard Break',
        action: () => curEditor.chain().focus().setHardBreak().run(),
      },
      {
        icon: 'format-clear',
        title: 'Clear Format',
        action: () => curEditor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        icon: 'arrow-go-back-line',
        title: 'Undo',
        action: () => curEditor.chain().focus().undo().run(),
      },
      {
        icon: 'arrow-go-forward-line',
        title: 'Redo',
        action: () => curEditor.chain().focus().redo().run(),
      },
      {
        icon: 'file-image-line',
        title: 'Image',
        action: () => {
          handleImageUpload()
        },
      },
      {
        icon: 'grid-line',
        title: 'Table',
        action: () => {
          const rows = parseInt(prompt('Enter number of rows') || '0', 10)
          const cols = parseInt(prompt('Enter number of columns') || '0', 10)
          if (rows > 0 && cols > 0) {
            curEditor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
          }
        },
      },
      {
        icon: 'merge-cells-horizontal',
        title: 'Merge Cell',
        action: () => {
          curEditor.chain().focus().mergeCells().run()
        },
      },
      {
        icon: 'split-cells-horizontal',
        title: 'Split Cell',
        action: () => {
          curEditor.chain().focus().splitCell().run()
        },
      },
      {
        icon: 'menu-fold-4-fill',
        title: 'Fold',
        action: () => {
          curEditor.chain().focus().setDetails().run()
        },
      },
      {
        icon: 'menu-fold-3-fill',
        title: 'UnFold',
        action: () => {
          curEditor.chain().focus().unsetDetails().run()
        },
      },
    ]

    setMenuItems(items)

    const updateMenuState = () => setMenuItems([...items])

    curEditor.on('transaction', updateMenuState)
    curEditor.on('selectionUpdate', updateMenuState)

    return () => {
      curEditor.off('transaction', updateMenuState)
      curEditor.off('selectionUpdate', updateMenuState)
    }
  }, [curEditor])

  const handleImageUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement

      if (target.files && target.files.length > 0) {
        const file = target.files[0]
        uploadAndInsertImage(file)
      }
    }

    input.click()
  }

  const uploadAndInsertImage = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch(`/page/image/${pageId}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const textResponse = await response.text()
      insertImageFromUrl(textResponse)
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const insertImageFromUrl = (url) => {
    curEditor.chain().focus().setImage({ src: url }).run()
  }

  return (
      <div className="editor__header border-b-[1px] border-blueishPurple">
        {menuItems.map((item, index) => (
            <Fragment key={index}>
              {item.title === 'Color' ? (
                  <ColorPickerItem
                      editor={curEditor}
                      isActive={item.isActive}
                      icon={''}
                      title={''}
                      action={() => {}}
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

export default MenuBar
