import React, { useEffect, useState } from 'react';

const FontSizeControl = ({ editor }) => {
  const defaultFontSize = '16px'; // 기본 글자 크기
  const [fontSize, setFontSize] = useState(defaultFontSize);

  const commonFontSizes = [
    '8px',
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '24px',
    '28px',
    '32px',
    '36px',
  ];

  useEffect(() => {
    const updateFontSizeFromSelection = () => {
      const attrs = editor.getAttributes('textStyle');
      // fontSize 속성이 있으면 해당 값을 사용, 없으면 기본 크기를 사용
      setFontSize(attrs.fontSize || defaultFontSize);
    };

    editor.on('transaction', updateFontSizeFromSelection);

    return () => {
      editor.off('transaction', updateFontSizeFromSelection);
    };
  }, [editor]);

  const handleFontSizeChange = (event) => {
    const newSize = event.target.value;
    setFontSize(newSize); // 상태 업데이트
    editor.chain().focus().setFontSize(newSize).run(); // 에디터에 적용
  };

  return (
      <div className="menu-item">
        <select
            onChange={handleFontSizeChange}
            value={fontSize}
            style={{ width: '4rem', color: 'black' }}
        >
          {commonFontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
          ))}
        </select>
      </div>
  );
};

export default FontSizeControl;
