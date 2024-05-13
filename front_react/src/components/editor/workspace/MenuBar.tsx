import './MenuBar.scss'
import React, { Fragment } from 'react'
import ColorPickerItem from '@/components/editor/workspace/ColorPickerItem'
import FontSizeControl from '@/components/editor/workspace/FontSizeControl'
import MenuItem from './MenuItem'
import {Editor} from "@tiptap/react";
import fetch from '@/lib/fetch.ts'

// MenuItemProps 인터페이스 정의
interface MenuItemProps {
  icon: string
  title: string
  action: () => void
  isActive?: () => boolean
  type?: string
}

interface MenuBarProp {
  editor:Editor
  pageId:string
}

const MenuBar: React.FC<MenuBarProp> = ({ editor, pageId }) => {

  const insertImageFromUrl = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
  };

  const uploadAndInsertImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/page/image/${pageId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const textResponse = await response.text();
      //const responseData = await response.json();  // JSON 형태로 응답 데이터 파싱
      console.log('Image uploaded and response received:', textResponse);
      insertImageFromUrl(textResponse)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;

      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        uploadAndInsertImage(file)
      } else {
        console.log("No file selected.");
      }
    };

    input.click();
  };

  const items: MenuItemProps[] = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: 'code-view',
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      icon: 'mark-pen-line',
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      icon: 'font-size',
      title: 'Font Size',
      action: () => {},
      isActive: () => editor.isActive('fontSize'),
    },
    {
      icon: 'palette-fill',
      title: 'Color',
      action: () => {},
      isActive: () => editor.isActive('color'),
    },
    {
      icon: 'h-1',
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: 'h-2',
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: 'list-check-2',
      title: 'Task List',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      icon: 'code-box-line',
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },

    {
      icon: 'double-quotes-l',
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: 'separator',
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: 'format-clear',
      title: 'Clear Format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
    {
      icon: 'file-image-line',
      title: 'Image',
      action: () => {
          handleImageUpload();
      },
    },
    {
      icon: 'grid-line',
      title: 'Table',
      action: () => {
        const rows = parseInt(prompt('Enter number of rows') || '0', 10)
        const cols = parseInt(prompt('Enter number of columns') || '0', 10)
        if (rows > 0 && cols > 0) {
          editor
            .chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: true })
            .run()
        }
      },
    },
    {
      icon: 'merge-cells-horizontal',
      title: 'Merge Cell',
      action: () => {
        editor.chain().focus().mergeCells().run()
      },
    },
    {
      icon: 'split-cells-horizontal',
      title: 'Split Cell',
      action: () => {
        editor.chain().focus().splitCell().run()
      },
    },
    {
      icon: 'menu-fold-4-fill',
      title: 'Fold',
      action: () => {
        editor.chain().focus().setDetails().run()
      },
    },
    {
      icon: 'menu-fold-3-fill',
      title: 'UnFold',
      action: () => {
        editor.chain().focus().unsetDetails().run()
      },
    },
  ]
  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.title === 'Color' ? (
            <ColorPickerItem editor={editor} isActive={item.isActive} icon={''} title={''} action={function (): void {
              throw new Error('Function not implemented.')
            }} />
          ) : item.title === 'Font Size' ? (
            <FontSizeControl editor={editor}/>
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default MenuBar
