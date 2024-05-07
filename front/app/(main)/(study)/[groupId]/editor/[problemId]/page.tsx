import * as React from 'react'
import MainComponent from '@/components/editor/MainComponent'

const EditorPage: React.FC = ({
  params,
}: {
  params: { groupId: number; problemId: number }
}) => <MainComponent groupId={params.groupId} problemId={params.problemId} />

export default EditorPage
