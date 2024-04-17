"use client";

const ProblemList: React.FC = () => {
    const items = [
        { id: 1, description: "[프로그래머스] 현우의 테트리스 교실" },
        { id: 2, description: "[백준] 1. 몰라" },
        { id: 3, description: "[백준] 5534. 민숭의 생일파티" },
        { id: 4, description: "[SWEA] 17898. 집가자" },
        { id: 5, description: "[SWEA] 1434. 우와" }
    ];

    const handleItemClick = (description: string) => {
        console.log(`클릭된 문제: ${description}`);
    };

    return (
        <div className="bg-lighterPurple w-full p-4 rounded-lg shadow-xl text-left">
            <div className="text-lg font-semibold mb-2">최근 학습한 목록</div>
            <hr className="border-t border-gray-200 my-2"/>
            <ul className="list-none space-y-2">
                {items.map((item) => (
                    <li key={item.id} className=" p-2 rounded cursor-pointer hover:bg-lightPurple transition-colors" onClick={() => handleItemClick(item.description)}>
                        <div>{item.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProblemList
