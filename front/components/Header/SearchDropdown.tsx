

import React, { useState } from 'react';
import SearchTagButtons from "@/components/Header/SearchTagButtons";

interface List {
    id: number;
    description: string;
}

interface Props {
    items: List[];
    handleItemClick: (description: string) => void;
}

interface Tags {
    id: number;
    description: string;
}

const SearchDropdown: React.FC<Props> = ({ items, handleItemClick }) => {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const tagList :Tags[] = [
        {id:1, description: "BFS" },
        {id:2, description: "DFS" },
        {id:3, description: "브루트포스"}
    ]

    return (
        <div className="relative w-full mx-auto">
            <input
                className="bg-lighterPurple w-full p-1 text-base border border-navy shadow-md"
                type="text"
                placeholder="스터디 검색"
                onClick={() => setDropdownVisible(!dropdownVisible)}
            />
            {dropdownVisible && (
                <div className="absolute w-full bg-background border shadow z-10">
                    <div>
                        {items.map((item, index) => (
                            <div key={index} className="p-2 hover:bg-lighterPurple"
                                 onClick={() => {
                                     handleItemClick(item.description);
                                     setDropdownVisible(false);
                                 }}>
                                {item.description}
                            </div>
                        ))}
                    </div>
                    <SearchTagButtons/>
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;