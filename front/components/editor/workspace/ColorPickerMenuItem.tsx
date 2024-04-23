import React, { useRef } from 'react'
import { useEditor } from '@tiptap/react'

const ColorPickerMenuItem = () => {
  const editor = useEditor()
  const colorInputRef = useRef(null)

  const handleColorChange = (event) => {
    const color = event.target.value
    editor?.chain().focus().setColor(color).run()
  }

  const openColorPicker = () => {
    colorInputRef.current.click()
  }

  return (
    <div>
      <button onClick={openColorPicker} title="Color">
        <i className="ri-palette-fill" /> {/* 아이콘을 적절히 조정하세요 */}
      </button>
      <input
        ref={colorInputRef}
        type="color"
        onChange={handleColorChange}
        style={{ display: 'none' }}
        defaultValue="#000000" // 초기 색상 값 설정
      />
    </div>
  )
}
export default ColorPickerMenuItem
