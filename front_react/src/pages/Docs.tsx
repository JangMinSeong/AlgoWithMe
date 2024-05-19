import * as React from 'react'
import MainComponent from '@/components/docs/MainComponent'
import { useParams } from 'react-router-dom'

const DocsPage: React.FC = () => {
  const { groupId, pageId } = useParams()
  return (
    <div>
      <MainComponent groupId={Number(groupId)} room={pageId} />
    </div>
  )
}

export default DocsPage
