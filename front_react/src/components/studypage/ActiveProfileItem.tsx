import { IRanking } from '@/features/study/studyTypes'

const ActiveProfileItem = ({
  person,
  rank,
}: {
  person: IRanking
  rank: number
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-bold text-lg mb-6">
        {rank === 0 && '🥇 1등'} {rank === 1 && '🥈 2등'}
        {rank === 2 && '🥉 3등'} {rank >= 3 && `${rank + 1}등`}
      </div>
      <div className="from-primary/50 via-secondary/50 to-blueishPurple/50 p-[2px] bg-gradient-to-br w-fit rounded-2xl mr-2 shadow-foggyBlue">
        <div className=" bg-white w-40 h-52 rounded-2xl flex flex-col items-center p-4">
          {/* gradient border */}
          <div className="h-[60%] flex items-center justify-center">
            <img
              src={person.imageUrl}
              alt="프사"
              width={72}
              height={72}
              className="border rounded-full"
            />
          </div>
          <div className="h-[40%] flex items-center flex-col justify-around">
            <div className="font-bold text-sm">{person.nickname}</div>
            <div className="text-xs text-navy">
              총 {person.solvedCount}문제를 풀었어요
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveProfileItem
