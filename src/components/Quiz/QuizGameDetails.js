import React, { Component } from 'react';
import {getGame} from '../utils';
import { calculateGameResult, getFullDate} from './quiz_utils';





class QuizGameDetails extends Component {

    state = {
        game:{}
    }

    componentDidMount()
    {
        this.getGameDetails();
           
    }

    getGameDetails = async () => {

    
         const game = await getGame('game_history', this.props.match.params.id)

         this.setState(() => ({ game: game.data() }));
    }

    showAnswers = (question, answers, index) => {
       
        let rowStyle = ""
        //shuffle answers
        for (let i = answers.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }

      const chosenAnswer = this.state.game.answers[index];
        
       return answers.map(answer => {

                        if(answer === question.correct_answer) rowStyle = "green accent-4"
                        else rowStyle = "indigo darken-4"
                            
                        return <tr className={rowStyle}><th><span  dangerouslySetInnerHTML={{ __html: answer}}/>{chosenAnswer === answer && " --> your answer" }</th></tr>}
                    )
    }
    
    render() {

        if(!this.state.game.questions) return <div>Loading</div>


        const percentage = calculateGameResult(this.state.game.questions, this.state.game.answers).percentage;

        return (
            <div>
                    <table className="blue history">
                        <thead className="blue">
                            <tr >
                                <th>Game details</th>
                            </tr>
                            <tr>
                                <th>Date played: <b>{getFullDate(this.state.game.date.seconds)}</b></th>
                            </tr>
                            <tr>
                                <th>Category: <b>{this.state.game.options.category}</b></th>
                            </tr>
                            <tr>
                                <th>Difficulty: <b>{this.state.game.options.difficulty}</b></th>
                            </tr>
                            <tr>
                                <th>Your score: <b>{percentage}%</b></th>
                            </tr>
                            <tr className="purple"><th></th></tr>

                        </thead>
    
                        <tbody>
                        { 
                            this.state.game.questions.map((question, i) =>
                                    (
                                    <React.Fragment>
                                        <tr className="blue">
                                            <th  dangerouslySetInnerHTML={{ __html: question.question }}/>
                                        </tr>
                                       
                                       
                                           {this.showAnswers(question, [...question.incorrect_answers, question.correct_answer], i)}

                                           <tr className="purple"><th></th></tr>
                                        
                                     </React.Fragment>
                                    )
                                    
                                    
                         )
                        }
                        </tbody>
                    </table>

            </div>
        );
    }
}


export default QuizGameDetails;