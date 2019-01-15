
var moment = require('moment');

const difficultyPoints = {easy: 100, medium: 200, hard: 300}

export const calculateGameResult = (questions, answeredQuestions) => {

    let totalQuestions = questions.length;
    let correctAnswers = 0;
    let gamePoints = 0;

    let percentage;

    questions.forEach((question, i) =>
    {
        if(question.correct_answer === answeredQuestions[i])
        {
            correctAnswers++;
            gamePoints += difficultyPoints[question.difficulty];
        }
    });
    
         percentage = Math.floor((correctAnswers/totalQuestions) * 100)

         console.log({correctAnswers, totalQuestions, gamePoints, percentage })
    return {correctAnswers, totalQuestions, gamePoints, percentage }
}

export const getFullDate = (seconds) => {

    return moment(seconds * 1000).format('MMMM Do YYYY, h:mm:ss a')
 }
 