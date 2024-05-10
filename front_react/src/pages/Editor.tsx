import * as React from 'react'
import MainComponent from '@/components/editor/MainComponent'
import {useParams} from "react-router-dom";

const EditorPage: React.FC = () => {
    const {groupId, pageId} = useParams()
    return (
        <MainComponent groupId={Number(groupId)} pageId={Number(pageId)}/>
    )
}

export default EditorPage
