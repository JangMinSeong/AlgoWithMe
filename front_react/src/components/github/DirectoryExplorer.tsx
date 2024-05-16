// BranchExplorer.tsx
import React, {useEffect, useState} from 'react';
import fetch from "@/lib/fetch.ts";

interface DirectoryProps {
    branch: string;
    repoName: string;
    directories : string[];
    setDirectories: (selected:string[]) => void;
    path : string;
    setPath : (selected:string) => void;
    setIsLoading: (arg:boolean) => void;
}

const DirectoryExplorer: React.FC<DirectoryProps> = ({ branch, repoName, directories, setDirectories, path, setPath, setIsLoading}) => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchDirectories = async (directory) => {
        // setIsLoading(true);  // Start loading
        const fullPath = `${path}${directory}`;
        const dataToPost = {
            repo:repoName,
            branch:branch,
            path:fullPath
        }
        try {
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
        } catch (error) {
            console.error('Failed to fetch branches:', error);
        } finally {
            setIsLoading(false);
            // onDirectorySelect(fullPath)
        }
    };

    const handleDirectoryClick = (event, directory: string) => {
        setIsLoading(true)
        event.stopPropagation();
        fetchDirectories(directory);
        setPath(path+directory)
    };

    if (directories.length === 0) {
        return <div className="text-sm text-gray-500">No Directory found.</div>;
    }

    return (
      <div className="space-y-1">
          {directories.map((directory, index) => (
            <div
              key={index}
              className="flex items-center mr-4 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
              onClick={(e) => handleDirectoryClick(e, directory)}
            >
                <img src="/folder.png" alt="folder" width={20} height={20} className="mr-2" />
                <span>{directory}</span>
            </div>
          ))}
      </div>
    );
};

export default DirectoryExplorer;
