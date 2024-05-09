import * as React from 'react'
import MainComponent from '@/components/docs/MainComponent'
import {useParams} from "react-router-dom";

const DocsPage: React.FC = () => {
    const {groupId, pageId} = useParams()
    return (
        <MainComponent pageId={Number(pageId)} room="test2" />
    )
}

export default DocsPage
