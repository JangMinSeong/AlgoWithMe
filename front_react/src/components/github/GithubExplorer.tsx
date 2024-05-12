import React, { useState, useEffect } from 'react';
import fetch from '@/lib/fetch.ts'
import BranchExplorer from "@/components/github/BranchExplorer.tsx";

interface Repository {
    name:string
    fullname:string
    description:string
    isPrivate:boolean
}


const GitHubExplorer = ({isOpen, isClose, repositories}) => {
    const [branches, setBranches] = useState<string[]>([])
    const [activeRepo, setActiveRepo] = useState<string | null>(null);
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
                                    <BranchExplorer branches={branches} repoName={repo.name}/>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="px-5 py-3 border-t border-gray-200 text-right">
                    <button onClick={isClose} className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
                </div>
            </div>
        </div>
    );
};

export default GitHubExplorer;