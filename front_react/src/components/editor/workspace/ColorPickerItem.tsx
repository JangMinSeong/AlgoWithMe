import React from 'react'
import { MenuItemProps } from './MenuItem'

// ColorPickerItem 컴포넌트 정의
const ColorPickerItem: React.FC<MenuItemProps & { editor: any }> = ({
  editor,
  isActive,
}) => {
    const currentColor = editor.getAttributes('textStyle').color || '#000000';

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="color"
                onInput={(event) => {
                    const newColor = event.target.value;
                    editor.chain().focus().setColor(newColor).run();
                }}
                value={currentColor}
                title="Color"
                data-testid="setColor"
                style={{ width: '2rem' }}
            />
        </div>
    );
}

export default ColorPickerItem
