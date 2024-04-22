import './MenuItem.scss'
import React from 'react'
import 'remixicon/fonts/remixicon.css'

interface MenuItemProps {
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
    className={`menu-item${isActive() ? ' is-active' : ''}`}
    onClick={action}
    title={title}
  >
    <i className={`remixicon-${icon}`} />
  </button>
)

export default MenuItem
