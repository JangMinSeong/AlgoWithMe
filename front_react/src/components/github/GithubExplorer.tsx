import React, { useState, useEffect } from 'react';
import fetch from '@/lib/fetch.ts'
import BranchExplorer from "@/components/github/BranchExplorer.tsx";
import DirectoryExplorer from '@/components/github/DirectoryExplorer.tsx'
import GithubUpload from '@/components/github/GithubUpload.tsx'

interface Repository {
    name: string
    fullname: string
    description: string
    isPrivate: boolean
}

const GitHubExplorer = ({isOpen, isClose, repositories, content, language}) => {
    const [branches, setBranches] = useState<string[]>([])
    const [activeRepo, setActiveRepo] = useState<string | null>(null);
    const [activeBranch, setActiveBranch] = useState(null)
    const [naviText, setNaviTest] = useState("리포지토리 선택")
    const [path, setPath] = useState("");
    const [directories, setDirectories] = useState<string[]>([])
    const [activeUpload, setActiveUpload] = useState(false)


    const handleBranchSelect = (branch:string) => {
        setActiveBranch(branch);
    };

    const handleRepoClick = async (repo:Repository) => {
        setActiveRepo(activeRepo === repo.name ? null : repo.name);
        setActiveBranch(null)
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if(activeRepo===null && activeBranch===null)
            setNaviTest("리포지토리 선택")
        else if(activeRepo && activeBranch===null)
            setNaviTest("브랜치 선택")
        else if(activeRepo&&activeBranch)
            setNaviTest("디렉토리 선택")
    }, [activeRepo, activeBranch])

    const handleSaveBtn = () => {
        setActiveUpload(true)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
                <div className="p-5">
                    <h2 className="text-xl font-bold mb-2">{naviText}</h2>
                    {activeRepo && <span className={"text-sm"} onClick={() => {setActiveRepo(null); setActiveBranch(null); setPath("");} }>{activeRepo+'/'}</span>}
                    {activeBranch && <span className={"text-sm"} onClick={() => {setActiveBranch(null); setPath("");}}>{activeBranch+'/'}</span>}
                    <span className={"text-sm"} >{path}</span>
                    {activeRepo === null &&
                      <ul className="space-y-2 overflow-y-auto max-h-64">
                        {repositories.map(repo => (
                          <li key={repo.name}
                              className={`flex flex-col items-start px-3 py-1 rounded-lg ${repo.private ? 'bg-red-100  hover:bg-red-300' : 'bg-blue-100  hover:bg-blue-300'}`}
                              onClick={() => handleRepoClick(repo)}>
                              <span>{repo.name}{repo.private &&
                                <span className="ml-2 text-red-500 text-sm">Private</span>}</span>
                          </li>
                        ))}
                    </ul>
                    }
                    {activeRepo ? (activeBranch ?
                      <DirectoryExplorer branch={activeBranch} repoName={activeRepo} directories={directories}
                                         setDirectories={setDirectories} path={path} setPath={setPath} />
                      : <BranchExplorer branches={branches} repoName={activeRepo}
                                        onBranchSelect={handleBranchSelect} setDirectories={setDirectories} />) : null
                    }
                </div>
                { activeBranch && <button onClick={handleSaveBtn}>저장</button>} <button onClick={() => isClose()}>닫기</button>
                {activeUpload && <GithubUpload content={content} language={language} setActiveUpload={setActiveUpload} activeRepo={activeRepo} activeBranch={activeBranch} path={path}/> }
            </div>
        </div>
    );
};

export default GitHubExplorer;