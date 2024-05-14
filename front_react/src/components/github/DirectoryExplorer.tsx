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
}

const DirectoryExplorer: React.FC<DirectoryProps> = ({ branch, repoName, directories, setDirectories, path, setPath}) => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchDirectories = async () => {
        // setIsLoading(true);  // Start loading
        const fullPath = `${path}`;
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
        } catch (error) {
            console.error('Failed to fetch branches:', error);
        } finally {
            // setIsLoading(false);
            // onDirectorySelect(fullPath)
        }
    };
    useEffect(() => {
        fetchDirectories()
    }, )
    useEffect(()=>{
        setDirectories(directories)
    },[directories])


    const handleDirectoryClick = (event, directory: string) => {
        event.stopPropagation();
        setDirectories([...directories, directory]);
        setPath(path+directory)
    };

    if (directories.length === 0) {
        return <div className="text-sm text-gray-500">No Directory found.</div>;
    }

    return (
        <div className="flex flex-col mb-1 space-y-1 w-full overflow-y-auto h-full">
            {directories.map((directory, index) => (
                <>
                <div key={index} className="mr-4 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer" onClick={(e) => handleDirectoryClick(e,directory)}>
                    {directory}
                </div>
                </>
            ))}
        </div>
    );
};

export default DirectoryExplorer;
