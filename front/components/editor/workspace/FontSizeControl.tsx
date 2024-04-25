import React, { useState } from 'react'

const FontSizeControl = ({ editor }) => {
  const [fontSize, setFontSize] = useState('16') // 초기 글자 크기 설정
  const commonFontSizes = [
    '8',
    '10',
    '12',
    '14',
    '16',
    '18',
    '20',
    '24',
    '28',
    '32',
    '36',
  ]

  const handleFontSizeChange = (event) => {
    const newSize = event.target.value.replace('px', '')
    setFontSize(newSize) // 상태 업데이트
    if (newSize.trim() !== '') {
      editor.chain().focus().setFontSize(`${newSize}px`).run() // 에디터에 적용
    }
  }

  return (
    <div className="menu-item">
      <select
        onChange={handleFontSizeChange}
        value={`${fontSize}px`}
        style={{ width: '4rem', color: 'black' }}
      >
        {commonFontSizes.map((size) => (
          <option key={size} value={`${size}px`}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  )
}

export default FontSizeControl
