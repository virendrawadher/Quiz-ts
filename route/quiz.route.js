const router = require('express').Router()
const Quiz = require("../controller/quiz.controller")

router.route('/quiz')
      .get(Quiz.get_quiz)
      .post(Quiz.post_quiz)

module.exports = router

