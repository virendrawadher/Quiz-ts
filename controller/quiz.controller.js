const Quiz = require('../model/quiz.model')
module.exports = {
    post_quiz: async(req, res) => {
        try {
            if(req.body){
                const quiz = await Quiz.create(req.body)
                res.json({
                    success: true,
                    quiz
                })
            }
        } catch (error) {
            res.json({
                success: false,
                error
            })
        }
    },
    get_quiz: async(req, res) => {
        try{
            const quizData =  await Quiz.find({})
            
            res.json({
                success: true,
                quiz: quizData
            })
            
        }catch(error){
            res.json({
                success: false,
                error
            })
        }
    },
    get_title: async(req, res) => {
        try{
            
            const title = await Quiz.find({}, {quizName: 1})
            
            res.json({
                success: true,
                title
            })
            
        }catch(error){
            
            res.json({
                success: false,
                error
            })
        }
    }
}