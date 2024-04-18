import React, { useState } from 'react';

interface Tags {
    id: number;
    description: string;
}

const TagButtons: React.FC = () => {
    const tagList: Tags[] = [
        { id: 1, description: "BFS" },
        { id: 2, description: "DFS" },
        { id: 3, description: "브루트포스" }
    ];

    // 각 태그의 클릭 상태를 추적하는 상태
    const [clickedTags, setClickedTags] = useState<{ [key: number]: boolean }>({});

    const handleItemClick = (tag: Tags) => {
        // 클릭된 태그의 상태를 현재와 반대로 설정
        setClickedTags(prevState => ({
            ...prevState,
            [tag.id]: !prevState[tag.id]
        }));
    };

    return (
        <div className="m-2 flex flex-row space-x-2">
            {tagList.map(tag => (
                <div key={tag.id}
                     className={`px-2 py-1 text-xs font-bold uppercase rounded shadow cursor-pointer
                                border ${clickedTags[tag.id] ? 'border-navy bg-background text-navy' : 'bg-accent border-darkPurple text-darkPurple'}
                                hover:border-darkPurple hover:text-darkPurple hover:bg-accent`}
                     onClick={() => handleItemClick(tag)}>
                    {tag.description}
                </div>
            ))}
        </div>
    );
};

export default TagButtons;
