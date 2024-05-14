// BranchExplorer.tsx
import React, {useEffect, useState} from 'react';
import fetch from "@/lib/fetch.ts";

interface DirectoryProps {
    branch: string;
    repoName: string;
    directories : string[];
    directoryName : string
    depth: number
    onDirectorySelect: (path: string) => void;
}

const DirectoryExplorer: React.FC<DirectoryProps> = ({ branch, repoName, directories, directoryName ,depth,onDirectorySelect}) => {
    const [directoryOpen, setDirectoryOpen] = useState<boolean>(false)
    const [subDirectories, setSubDirectories] = useState<string[]> ([])
    const [curDirectory, setCurDirectory] = useState<string>()
    const [curDirectories, setCurDirectories] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pl = depth * 10

    useEffect(()=>{
        setCurDirectories(directories)
    },[directories])

    useEffect(() => {
        if (directoryOpen && curDirectory) {
            const fetchDirectories = async () => {
                setIsLoading(true);  // Start loading
                const fullPath = `${directoryName}` ? `${directoryName}/${curDirectory}` : `${curDirectory}`;
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
                    setSubDirectories(responseData);
                } catch (error) {
                    console.error('Failed to fetch branches:', error);
                } finally {
                    setIsLoading(false);  // Stop loading regardless of success or failure
                    onDirectorySelect(fullPath)
                }
            };

            fetchDirectories();
        }
    }, [directoryOpen, curDirectory, repoName, branch, directoryName]);

    const handleDirectoryClick = (event, directory: string) => {
        event.stopPropagation(); // Prevent event bubbling
        if (curDirectory === directory) {
            setDirectoryOpen(!directoryOpen); // Toggle current directory
        } else {
            setCurDirectory(directory); // Set new directory and open it
            setDirectoryOpen(true);
        }
    };

    if (directories.length === 0) {
        return <div className="text-sm text-gray-500">No Directory found.</div>;
    }

    return (
        <div className="flex flex-col mb-1 space-y-1 w-full overflow-y-auto h-full" style={{paddingLeft: pl}}>
            {curDirectories.map((directory, index) => (
                <>
                <div key={index} className="mr-4 px-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer" onClick={(e) => handleDirectoryClick(e,directory)}>
                    {directory}
                </div>
                {directoryOpen && curDirectory === directory &&(
                    <>
                    {isLoading ? (
                            <div className={"text-sm text-gray-500"}>Loading...</div>  // Loading indicator
                        ) : (
                            <DirectoryExplorer
                                branch={branch}
                                repoName={repoName}
                                directories={subDirectories}
                                directoryName={`${directoryName} ? ${directoryName}/${directory} : ${directory}`}
                                depth={depth + 1}
                                onDirectorySelect={onDirectorySelect}
                            />
                        )}
                    </>
                )
                }
                </>
            ))}
        </div>
    );
};

export default DirectoryExplorer;
