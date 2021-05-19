import {Questions, Options} from "../type-aliases/type"


const CalculateScore = (currentScore: number, currentQues: Questions, selectedOption: Options): number => {
    return selectedOption.isRight ? 
            currentScore + currentQues.points :
            currentScore - 5

}

export default CalculateScore