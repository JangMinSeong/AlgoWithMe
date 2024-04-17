import * as React from "react";
import ProblemList from "@/components/mainpage/ProblemList";
import PieChart from "@/components/mainpage/PieChart";

const ChartProblem : React.FC = () => {
    return (
        <div className="flex-grow bg-lighterPurple flex flex-row w-full justify-center items-center">
            <div className="flex justify-center m-10 h-96 w-96" style={{flexGrow:1}}>
                <PieChart/>
            </div>
            <div className="flex justify-center m-10 h-fit pr-10" style={{flexGrow:1}}>
                <ProblemList/>
            </div>
        </div>
    )
}

export default ChartProblem;