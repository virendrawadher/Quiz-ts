import {Quiz} from "../type-aliases/type"

const QuizData: Quiz = {
    quizName: "Introduction to JavaScript",
    questions: [
        {
            question: "When was JavaScript Invented",
            code: null,
            points: 10,
            options: [
                {
                    answer: "June 04, 1993",
                    isRight: false
                },
                {
                    answer: "December 04, 1995",
                    isRight: true
                },
                {
                    answer: "August 19, 1979",
                    isRight: false
                },
                {
                    answer: "January 30, 1985",
                    isRight: false
                }
            ]
        },
        {
            question: "How is the IF statement return in javascript",
            code: null,
            points: 10,
            options: [
                {
                    answer: "if condition",
                    isRight: false
                },
                {
                    answer: "condtion if",
                    isRight: false
                },
                {
                    answer: "if (condition)",
                    isRight: true
                },
                {
                    answer: "if{codition}",
                    isRight: false
                }
            ]
        },
        {
            question: "What is mean by 'this' keyword in JavaScript",
            code: null,
            points: 10,
            options: [
                {
                    answer: "It refers to current object",
                    isRight: true
                },
                {
                    answer: "It refers to previous object",
                    isRight: false
                },
                {
                    answer: "It is variable which contain value",
                    isRight: false
                },
                {
                    answer: "None of the above",
                    isRight: false
                }
            ]
        },
        {
            question: "In which case types JavaScript variables are declared",
            code: null,
            points: 10,
            options: [
                {
                    answer: "Snake Case",
                    isRight: false
                },
                {
                    answer: "Kebab Case",
                    isRight: false
                },
                {
                    answer: "Pascal Case",
                    isRight: false
                },
                {
                    answer: "Camel Case",
                    isRight: true
                }
            ]
        },
        {
            question: "What is Output of Following code",
            code: `let a = 10 
            function b(a){ 
                a = a + 5
            } 
            function d(){
                alert(a)
            } 
            d()`,
            points: 10,
            options: [
                {
                    answer: "15",
                    isRight: false
                },
                {
                    answer: "10",
                    isRight: true
                },
                {
                    answer: "12",
                    isRight: false
                },
                {
                    answer: "16",
                    isRight: false
                }
            ]
        },
        {
            question: "What are the data Structure in JavaScript",
            code: null,
            points: 10,
            options: [
                {
                    answer: "Linked list, Object",
                    isRight: false
                },
                {
                    answer: "Stack, Object, Array",
                    isRight: false
                },
                {
                    answer: "Array, Object, Queue",
                    isRight: false
                },
                {
                    answer: "Object and Array",
                    isRight: true
                }
            ]
        },

    ]
}

export default QuizData