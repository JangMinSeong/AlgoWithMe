// BranchExplorer.tsx
import React, {useState} from 'react';
import fetch from "@/lib/fetch.ts";
import DirectoryExplorer from "@/components/github/DirectoryExplorer.tsx";

interface BranchExplorerProps {
    branches: string[];
    repoName: string;
    onDirectorySelect: (path: string) => void;
    onBranchSelect: (branchName: string) => void;
}

const BranchExplorer: React.FC<BranchExplorerProps> = ({ branches, repoName,onDirectorySelect , onBranchSelect}) => {
    const [directories, setDirectories] = useState<string[]>([])
    const [activeBranch, setActiveBranch] = useState<string | null>(null);

    if (branches.length === 0) {
        return <div className="text-sm text-gray-500">No branches found.</div>;
    }

    const handleBranchClick = async (event,branchName) => {
        event.stopPropagation();
        onBranchSelect(branchName)
        setActiveBranch(activeBranch === branchName ? null : branchName);
        const response = await fetch(`/github/repository/${repoName}/${branchName}?path=`, {
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
        onDirectorySelect("")
        console.log(responseData)
    }

    return (
        <div className="flex flex-col space-y-1 w-full overflow-y-auto h-full">
            {branches.map((branch, index) => (
                <div key={index} className={`mr-4 px-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer`} onClick={(e) => handleBranchClick(e,branch)}>
                    {branch}
                    {activeBranch === branch && (
                        <DirectoryExplorer branch={branch} repoName={repoName} directories={directories} directoryName={""} depth={0} onDirectorySelect={onDirectorySelect}/>
                    )}
                </div>
            ))}
        </div>
    );
};

export default BranchExplorer;
