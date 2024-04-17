

interface CardProps {
    imageSrc?: string;
    date?: string;
    studyName?: string;
    onClick?: () => void;
}
const StudyCard: React.FC<CardProps> = ({ imageSrc, date, studyName, onClick }) => {
    return (
        <div
            className="bg-white shadow-lg cursor-pointer hover:scale-105 transition transform duration-150 ease-in-out"
            onClick={onClick}
        >
            <div className="w-60 h-56 overflow-hidden rounded-lg bg-gray-200">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="Study"
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <img
                        src="/vercel.svg"
                        alt="no image"
                        className="h-full w-full object-contain"
                    />
                )}
            </div>
            <div className="text-left bg-background w-full">
                <div className="m-2 pt-2 mb-0">{studyName}</div>
                {date && <p className="ml-2 pb-2 text-sm text-navy">{date}</p>}
            </div>
        </div>
    );
}

export default StudyCard;
