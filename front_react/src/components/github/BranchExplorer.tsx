// BranchExplorer.tsx
import React, {useState} from 'react';
import fetch from "@/lib/fetch.ts";

interface BranchExplorerProps {
    branches: string[];
    repoName: string;
    onBranchSelect: (branchName: string) => void;
    setDirectories: (selected:string[]) => void;
}

const BranchExplorer: React.FC<BranchExplorerProps> = ({ branches, repoName , onBranchSelect, setDirectories}) => {
    const [activeBranch, setActiveBranch] = useState<string | null>(null);

    if (branches.length === 0) {
        return <div className="text-sm text-gray-500">No branches found.</div>;
    }

    const handleBranchClick = async (event,branchName) => {
        event.stopPropagation();
        onBranchSelect(branchName)
        setActiveBranch(activeBranch === branchName ? null : branchName);
        const dataToPost = {
            repo:repoName,
            branch:branchName,
            path:""
        }
        const response = await fetch(`/github/directory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(dataToPost)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setDirectories(responseData.map((dir: string) => `${dir}/`));
        console.log(responseData)
    }

    return (
        <div className="flex flex-col space-y-1 w-full overflow-y-auto h-full">
            {branches.map((branch, index) => (
                <div key={index} className={`mr-4 px-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer`} onClick={(e) => handleBranchClick(e,branch)}>
                    {branch}
                </div>
            ))}
        </div>
    );
};

export default BranchExplorer;
