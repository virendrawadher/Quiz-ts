const router = require('express').Router()
const Quiz = require("../controller/quiz.controller")
const checkUser = require('../middleware/loginmiddleware')

// router
//       .use(checkUser)
//       .route('/quiz')
//       .get(Quiz.get_quiz)
//       .post(Quiz.post_quiz)
      
router.get('/quiz', checkUser, Quiz.get_quiz)

router.post('/quiz', checkUser, Quiz.post_quiz)

router.get('/quiz/title', Quiz.get_title)
      
// router      
//       .route('/quiz/title')
//       .get(Quiz.get_title)

module.exports = router

