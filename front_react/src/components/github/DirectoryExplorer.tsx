// BranchExplorer.tsx
import React, {useState} from 'react';
import fetch from "@/lib/fetch.ts";

interface DirectoryProps {
    branch: string;
    repoName: string;
    directories : string[];
}

const DirectoryExplorer: React.FC<DirectoryProps> = ({ branch, repoName, directories }) => {

    if (directories.length === 0) {
        return <div className="text-sm text-gray-500">No Directory found.</div>;
    }

    const handleDirectoryClick = async (event, directoryName) => {
        event.stopPropagation();
        // const response = await fetch(`/github/repository/${repoName}/${branch}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        //
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        //
        // const responseData = await response.json();
        // console.log(responseData)
    }

    return (
        <div className="flex flex-col space-y-1 w-full overflow-y-auto max-h-32">
            {directories.map((directory, index) => (
                <div key={index} className="mr-4 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer" onClick={(e) => handleDirectoryClick(e,directory)}>
                    {directory}
                </div>
            ))}
        </div>
    );
};

export default DirectoryExplorer;
