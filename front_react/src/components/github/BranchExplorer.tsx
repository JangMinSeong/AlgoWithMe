// BranchExplorer.tsx
import React, {useState} from 'react';
import fetch from "@/lib/fetch.ts";
import DirectoryExplorer from "@/components/github/DirectoryExplorer.tsx";

interface BranchExplorerProps {
    branches: string[];
    repoName: string;
}

const BranchExplorer: React.FC<BranchExplorerProps> = ({ branches, repoName }) => {
    const [directories, setDirectories] = useState<string[]>([])
    const [activeBranch, setActiveBranch] = useState<string | null>(null);

    if (branches.length === 0) {
        return <div className="text-sm text-gray-500">No branches found.</div>;
    }

    const handleBranchClick = async (event,branchName) => {
        event.stopPropagation();
        setActiveBranch(activeBranch === branchName ? null : branchName);
        const response = await fetch(`/github/repository/${repoName}/${branchName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setDirectories(responseData)
        console.log(responseData)
    }

    return (
        <div className="flex flex-col space-y-1 w-full overflow-y-auto max-h-48">
            {branches.map((branch, index) => (
                <div key={index} className="mr-4 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer" onClick={(e) => handleBranchClick(e,branch)}>
                    {branch}
                    {activeBranch === branch && (
                        <DirectoryExplorer branch={branch} repoName={repoName} directories={directories}/>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BranchExplorer;
