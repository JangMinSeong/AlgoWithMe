import React, { useState, useEffect } from 'react';
import fetch from '@/lib/fetch.ts'
import BranchExplorer from "@/components/github/BranchExplorer.tsx";

interface Repository {
    name: string
    fullname: string
    description: string
    isPrivate: boolean
}

const GitHubExplorer = ({isOpen, isClose, repositories}) => {
    const [branches, setBranches] = useState<string[]>([])
    const [activeRepo, setActiveRepo] = useState<string | null>(null);
    const [selectedDirectoryPath, setSelectedDirectoryPath] = useState( "");
    const [activeBranch, setActiveBranch] = useState("")
    const [commitMessage, setCommitMessage] = useState("")
    const [filename, setFilename] = useState("")

    const handleSaveButton = () => {  //TODO: 깃 저장 호출
        console.log(selectedDirectoryPath)
        console.log(activeBranch)
        console.log(activeRepo)
        console.log(commitMessage)
        console.log(filename)
    }

    const handleDirectorySelect = (path:string) => {
        setSelectedDirectoryPath(path);
    };

    const handleBranchSelect = (branch:string) => {
        setActiveBranch(branch);
    };

    const handleRepoClick = async (repo:Repository) => {
        setActiveRepo(activeRepo === repo.name ? null : repo.name);

        const response = await fetch(`/github/repository/${repo.name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setBranches(responseData)
        console.log(responseData)
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
                <div className="p-5">
                    <h2 className="text-xl font-bold mb-4">GitHub Repositories</h2>
                    <ul className="space-y-2 overflow-y-auto max-h-64">
                        {repositories.map(repo => (
                            <li key={repo.name} className={`flex flex-col items-start px-3 py-1 rounded-lg ${repo.private ? 'bg-red-100  hover:bg-red-300' : 'bg-blue-100  hover:bg-blue-300'}`} onClick={()=>handleRepoClick(repo)}>
                                <span>{repo.name}{repo.private && <span className="ml-2 text-red-500 text-sm">Private</span>}</span>
                                {activeRepo === repo.name && (
                                    <BranchExplorer branches={branches} repoName={repo.name} onDirectorySelect={handleDirectorySelect} onBranchSelect={handleBranchSelect}/>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={"flex flex-col justify-end border-t border-gray-200 mx-3"}>
                    <div className={"mr-5"}>
                        <textarea
                            className={"border border-gray-300 py-2 mt-3 w-full pl-5 ml-2 resize-none overflow-auto"}
                            placeholder={"커밋 메시지를 입력해 주세요"}
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div className={"flex flex-row mb-3"}>
                        <input
                            className={"w-full pl-5 ml-2 border border-gray-300 "}
                            placeholder={"제목을 입력해 주세요"}
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                        ></input>
                        <div className="ml-2 pr-2  text-right">
                            <button onClick={handleSaveButton}
                                    className="py-2 px-4 bg-fuchsia-300 text-white rounded hover:bg-navy">Save
                            </button>
                        </div>
                        <div className="mr-3 text-right">
                            <button onClick={isClose}
                                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitHubExplorer;