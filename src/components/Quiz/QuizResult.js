import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuizHistory from './QuizHistory';
import { calculateGameResult } from './quiz_utils';
import {addDocumentToCollection, setPoints, getCollection} from '../utils';
import firebase from 'firebase';




class QuizResult extends Component {

    async componentDidMount()
    {
        //check if questions.length is 0 ..this means someone has just refreshed this page so send them to quiz start page instead
        if(this.props.questions.length === 0)
        {
            this.props.history.push("/quiz");
            return;
        }

        //save game to database
        const game = 
        {
            questions: this.props.questions,
            answers: this.props.answeredQuestions,
            options: this.props.options,
            date: new firebase.firestore.Timestamp.fromDate(new Date()),
            points: calculateGameResult(this.props.questions, this.props.answeredQuestions).gamePoints,
            uid: this.props.authenticated.user.uid
        }

        try
        {
            await addDocumentToCollection('game_history', game);
            this.props.updatePoints(game.points);//update redux
            
            const usersSnapshot = await getCollection('users', game.uid)//update firebase db

            usersSnapshot.forEach((user) => {
               if(user.data().uid === game.uid)
               {
                   const documentID = user.id;
                   setPoints("users", documentID, this.props.points)
               }
            });

            //now we have document id lets update db with new points


        }catch (err){
            console.log("error adding game ", err)
        }

    }
    render() {
        return (
            <div className="center">
                <h2>Result</h2>  
                <p>
                    Congrats you scored { calculateGameResult(this.props.questions, this.props.answeredQuestions).correctAnswers } out of { calculateGameResult(this.props.questions, this.props.answeredQuestions).totalQuestions }
                </p>
                <QuizHistory />
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
       updatePoints: (points) => { dispatch({ type:"SET_USER_POINTS", points }) }
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuizResult);
  