const initState = {

  options: { category: "", difficulty:"", type:"", amount:"" },
  questions: [],
  shuffledAnswers: [],
  currQuestion: 0,
  answeredQuestions: [],
  points: 0,
  display_name: "",
  authenticated: { user: null }
}

  const rootReducer = ( state = initState, action ) =>
  {
    
    switch(action.type) {

        case "SELECT_QUIZ_TYPE":
            const e = action.e;
            return { ...state, options: {...state.options, [e.target.id]: e.target.value} };

        case "RECEIVED_QUESTIONS":
            const questions = action.questions;
            const shuffledAnswers = [];
    
            questions.forEach((question) => {
                let allAnswers = [...question.incorrect_answers, question.correct_answer];
                shuffleArray(allAnswers)
                shuffledAnswers.push(allAnswers)
            })
            
            return { ...state, questions, shuffledAnswers }

        case "SET_USER_POINTS":
             return { ...state, points: state.points + action.points };

        case "NEXT_QUESTION":
            return { ...state, currQuestion: state.currQuestion + 1 }

        case "PREV_QUESTION":
             return { ...state, currQuestion: state.currQuestion - 1 }

        case "UPDATE_ANSWERED_QUESTIONS":
             const temp = state.answeredQuestions.slice();
             temp[state.currQuestion] = action.answer;
             return { ...state, answeredQuestions: temp }

        case "SET_AUTHENTICATED_USER":
             return { ...state, authenticated: { user: action.user } }

        case "SET_DISPLAY_NAME":
             return { ...state, display_name: action.display_name}

        case "LOGGED_OUT":
            return initState;

        case "RESET_GAME":
            return {...state, options: { category: "", difficulty:"", type:"", amount:"" }, questions:[], shuffledAnswers:[], currQuestion:0, answeredQuestions:[]}
       
          default:
             return state;

      }

  }
    


const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
 

  export default rootReducer;
