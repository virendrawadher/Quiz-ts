export type Options = {
    answer: string,
    isRight: boolean
}

export type Questions = {
    question: string,
    points: number,
    code: string | null
    options: Options[]
}

export type Quiz = {
    quizName: string,
    questions: Questions[]
}