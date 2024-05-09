import React from 'react'
import { MenuItemProps } from './MenuItem'

// ColorPickerItem 컴포넌트 정의
const ColorPickerItem: React.FC<MenuItemProps & { editor: any }> = ({
  editor,
  isActive,
}) => (
  <input
    type="color"
    className={`menu-item${isActive() ? ' is-active' : ''}`}
    onInput={(event) =>
      editor.chain().focus().setColor(event.target).run()
    }
    value={editor.getAttributes('textStyle').color || '#000000'}
    title="Color"
    data-testid="setColor"
    style={{ width: '2rem' }}
  />
)

export default ColorPickerItem
