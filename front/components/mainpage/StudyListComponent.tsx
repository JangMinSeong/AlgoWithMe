import StudyCard from "@/components/mainpage/StudyCard";
import * as React from "react";

const StudyList : React.FC = () => {
    return (
        <div>
            <div className="flex flex-row justify-between items-center w-full mt-6 text-lg pl-5 pr-5">
                <div>최근 스터디</div>
                <button>...</button>
            </div>
            <div className="flex justify-around mt-2 space-x-10">
                <StudyCard imageSrc="/next.svg" date="2024.2.5" studyName="오구오구 스터디"/>
                <StudyCard date="2024.4.17" studyName="스터디2"/>
                <StudyCard date="2024.4.15" studyName="스터디3"/>
                <StudyCard date="2024.4.15" studyName="스더티4"/>
            </div>
        </div>
    );
}

export default StudyList;
