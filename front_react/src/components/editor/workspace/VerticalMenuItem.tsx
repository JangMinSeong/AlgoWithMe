import './MenuItem.scss'
import React from 'react'
import 'remixicon/fonts/remixicon.css'
import Button from '@/components/Button'


const translations = {
    'Code Block': '코드 블록',
    'Blockquote': '인용구',
    'Horizontal Rule': '수평선',
    'Image': '이미지',
    'Table': '표',
    'Merge Cell': '셀 병합',
    'Split Cell': '셀 분할',
    'Fold': '접기',
    'UnFold': '펼치기',
}

export interface MenuItemProps {
    icon: string
    title: string
    action: () => void
    isActive?: () => boolean
}

const MenuItem: React.FC<MenuItemProps> = ({
                                               icon,
                                               title,
                                               action,
                                               isActive = () => false,
                                           }) => (
    <button
        className={`w-full menu-item flex items-center ${isActive() ? ' is-active' : ''} flex justify-start`}
        onClick={action}
        title={title}
    >
        <i className={`ri-${icon}`} />
        <div className = "ml-2"> {translations[title]}</div>
    </button>
)

export default MenuItem
