import React, { useState, useEffect } from 'react';
import fetch from '@/lib/fetch.ts'
import BranchExplorer from "@/components/github/BranchExplorer.tsx";

interface Repository {
    name: string
    fullname: string
    description: string
    isPrivate: boolean
}

const GitHubExplorer = ({isOpen, isClose, repositories, content, language}) => {
    const [branches, setBranches] = useState<string[]>([])
    const [activeRepo, setActiveRepo] = useState<string | null>(null);
    const [selectedDirectoryPath, setSelectedDirectoryPath] = useState( "");
    const [activeBranch, setActiveBranch] = useState("")
    const [commitMessage, setCommitMessage] = useState("")
    const [filename, setFilename] = useState("")

    const handleSaveButton = async () => {  //TODO: 깃 저장 호출
        const dataToSave = {
            repo : activeRepo,
            branch :activeBranch,
            path : selectedDirectoryPath,
            fileName : filename,
            language,
            content,
            commitMessage:commitMessage
        }
        if(filename && commitMessage) {
            await fetch(`/github/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave)
            });
            isClose()
        }
        else alert("파일명과 커밋 메시지를 작성해주세요")
    }

    const handleDirectorySelect = (path:string) => {
        setSelectedDirectoryPath(path);
    };

    const handleBranchSelect = (branch:string) => {
        setActiveBranch(branch);
    };

    const handleRepoClick = async (repo:Repository) => {
        setActiveRepo(activeRepo === repo.name ? null : repo.name);
        setSelectedDirectoryPath("")
        setActiveBranch("")

        const dataToPost = {
            repo:repo.name
        }
        const response = await fetch(`/github/branch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToPost)
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
                    <h2 className="text-xl font-bold mb-2">GitHub Repositories</h2>
                    <h3 className={"text-sm m-2 mt-0 pt-0 "}>{activeBranch && `Path : ` } {selectedDirectoryPath}</h3>
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
                        {activeBranch &&
                            <textarea
                                className={"border border-gray-300 py-2 mt-3 w-full pl-5 ml-2 resize-none overflow-auto"}
                                placeholder={"커밋 메시지를 입력해주세요"}
                                value={commitMessage}
                                onChange={(e) => setCommitMessage(e.target.value)}
                            ></textarea>
                        }
                    </div>
                    <div className={`mb-3 w-full flex ${activeBranch ? 'justify-between' : 'justify-end'}`}>
                        {activeBranch && (
                            <>
                                <input
                                    className="w-full pl-5 border border-gray-300 ml-2"
                                    placeholder="파일명을 입력해주세요"
                                    value={filename}
                                    onChange={(e) => setFilename(e.target.value)}
                                />
                                <div className = {"text-sm text-gray-500 pr-10 pt-5 pl-2"}>.{language}</div>
                                <div className="text-right pr-2">
                                    <button onClick={handleSaveButton}
                                            className="py-2 px-4 bg-fuchsia-300 text-white rounded hover:bg-navy">
                                        Save
                                    </button>
                                </div>
                            </>
                        )}
                        <div className="text-right">
                            <button onClick={isClose}
                                    className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitHubExplorer;