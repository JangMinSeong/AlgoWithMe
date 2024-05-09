import * as React from 'react'
import MainComponent from '@/components/docs/MainComponent'

const DocsPage: React.FC = ({
  params,
}: {
  params: { groupId: number; pageId: number }
}) => <MainComponent pageId={params.pageId} room="test2" />

export default DocsPage
