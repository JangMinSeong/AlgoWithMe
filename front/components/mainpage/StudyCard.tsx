

interface CardProps {
    imageSrc?: string;
    date?: string;
    studyName?: string;
}
const StudyCard: React.FC<CardProps> = ({ imageSrc, date, studyName }) => {
    return (
        <div className="flex flex-col items-center border-gray-200 shadow-lg">
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
                <div className="m-2">{studyName}</div>
                {date && <p className="m-2 text-sm text-navy">{date}</p>}
            </div>
        </div>
    );
}

export default StudyCard;
