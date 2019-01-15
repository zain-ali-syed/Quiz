

const initState =
{ 
  options: { category: "", difficulty:"", type:"", amount:"" },
  questions: [],
  shuffledAnswers: [],
  currQuestion: 0,
  answeredQuestions: [],
  points:0,
  display_name:"",
  authenticated: { user: null }
}

  const rootReducer = ( state = initState, action ) =>
  {
    if(action.type === "SELECT_QUIZ_TYPE")
    {
      const e = action.e;
      return { ...state, options: {...state.options, [e.target.id]: e.target.value} }
    }

    if(action.type === "RECEIVED_QUESTIONS")
    {
      const questions = action.questions;
      const shuffledAnswers = [];

      questions.forEach((question) => {
        let allAnswers = [...question.incorrect_answers, question.correct_answer];
        shuffleArray(allAnswers)
        shuffledAnswers.push(allAnswers)
      })


      return { ...state, questions, shuffledAnswers }
    }

    if(action.type === "SET_USER_POINTS")
    {
      return { ...state, points: state.points + action.points }
    }
    
    if(action.type === "NEXT_QUESTION")
    {
      return { ...state, currQuestion: state.currQuestion + 1 }
    }

    if(action.type === "PREV_QUESTION")
    {
      return { ...state, currQuestion: state.currQuestion - 1 }
    }

    if(action.type === "UPDATE_ANSWERED_QUESTIONS")
    {
      const temp = state.answeredQuestions.slice();
      temp[state.currQuestion] = action.answer;
      return { ...state, answeredQuestions: temp }
    }

    if(action.type === "SET_AUTHENTICATED_USER")
    {
      console.log(" in reducer set to user ", action.user.email)
      return { ...state, authenticated: { user: action.user } }
    }

    if(action.type === "SET_DISPLAY_NAME")
    {
      return { ...state, display_name: action.display_name}
    }

    if(action.type === "LOGGED_OUT")
    {
      return initState;
    }

    if(action.type === "RESET_STATE")
    {
      return {...state, options: { category: "", difficulty:"", type:"", amount:"" }, questions:[], shuffledAnswers:[], currQuestion:0, answeredQuestions:[]}
    }

    return state;
  }


const shuffleArray = (array) => {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
 

  export default rootReducer;