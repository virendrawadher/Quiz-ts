const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OptionSchema = new Schema({
    answer: {
        type:String,
        required: true
    },
    isRight: {
        type:Boolean,
        required: true
    }
})

const QuizQuestion = new Schema({
    question: {
        type:String,
        required: true
    },
    time: {
        type:String,
        required: true
    },
    point: {
        type: Number,
        required: true
    },
    option: [OptionSchema]
})

const QuizSchema = new Schema({
    quizName: {
        type:String,
        required: true
    },
    questions: [QuizQuestion]
})

module.exports = mongoose.model('Quiz', QuizSchema)