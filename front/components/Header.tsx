"use client";

const MainHeader: React.FC = () => {
    return (
        <header className="w-full flex justify-between p-2 shadow">
            <div className="ml-2 text-xl font-bold">LOGO</div>
            <input className="flex-grow p-1 text-base border rounded" type="text" placeholder="스터디 검색"
                   style={{flexGrow: 0.5}}/>
            <div className="mr-2">profile</div>
        </header>
    )
}

export default MainHeader;
