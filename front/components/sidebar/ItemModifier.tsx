'use client'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { useState } from 'react'
import DeleteButton from './DeleteButton'

const ItemModifier = () => {
  const [isShowingDelete, setIsShowingDelete] = useState(false)
  const handleShowDelete = (e) => {
    e.stopPropagation()
    setIsShowingDelete(!isShowingDelete)
  }
  return (
    <div>
      <HiOutlineDotsHorizontal
        className="bg-white w-4 rounded-sm bg-opacity-60 relative"
        onClick={handleShowDelete}
      />
      {isShowingDelete && (
        <div className="absolute">
          <DeleteButton />
        </div>
      )}
    </div>
  )
}

export default ItemModifier
