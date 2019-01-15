import React, { Component } from 'react';
import QuizItem from './QuizItem';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



const baseURL = "https://opentdb.com/api.php?";

class QuizList extends Component {

    createQueryString = () => {

        const {category, difficulty, type, amount} = this.props.options;
        let queryString = "";

        if(amount !== "") queryString += `amount=${amount}`
        else queryString += `amount=5`;

        if(category !== "") queryString += `&category=${category}`;
        if(difficulty !== "") queryString += `&difficulty=${difficulty}`;
        if(type !== "") queryString += `&type=${type}`;
       

        return queryString;
    }

    componentDidMount()
    {
        fetch(baseURL + this.createQueryString())
                .then(response => response.json())
                .then(data => {      
                 this.props.receivedQuestions(data.results);
               })
    }

    updateAnsweredQuestions = (answer) => {
        this.props.updateAnsweredQuestions(answer)
    }

    render() {
        const { questions, currQuestion } = this.props;
       
        if(questions.length  === 0 )  return <div> Loading </div>;

        if(this.props.answeredQuestions.length === this.props.questions.length)
        {
            return <Redirect to='/quiz_result' />
        }
           
        const allAnswers = this.props.shuffledAnswers[currQuestion]
      
        

        return (
            <div style={{marginBottom:"200px"}}>
                    <span>{this.props.currQuestion+1} of {this.props.questions.length}</span>
                <QuizItem {...questions[currQuestion]} 
                          allAnswers={allAnswers}
                          updateAnsweredQuestions = {this.updateAnsweredQuestions}
                          nextQuestion = {this.props.nextQuestion}
                          />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
             options: state.options,
             questions: state.questions,
             shuffledAnswers: state.shuffledAnswers,
             currQuestion: state.currQuestion,
             answeredQuestions: state.answeredQuestions,
             points: state.points,
             authenticated: state.authenticated
           }
  }
  
  
  const mapDispatchToProps = (dispatch) => {
    return {
       receivedQuestions: (questions) => { dispatch({ type:"RECEIVED_QUESTIONS", questions }) },
       updateAnsweredQuestions: (answer) => { dispatch({ type:"UPDATE_ANSWERED_QUESTIONS", answer }) },
       updatePoints: (points) => { dispatch({ type:"UPDATE_ANSWSET_USER_POINTS", points }) },
       nextQuestion: () => dispatch({ type:"NEXT_QUESTION" }),
       prevQuestion: () => dispatch({ type:"PREV_QUESTION" }),
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizList);