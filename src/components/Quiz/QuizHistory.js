import React, { Component } from 'react';
import {getGameHistory} from '../utils';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { calculateGameResult, getFullDate} from './quiz_utils';






class QuizHistory extends Component {

    state =
    {
        games: []
    }

   componentDidMount()
   {
    this.getGameHistory()
   }

   getGameHistory = async () => {

    
        const games = [];
        const gamesSnapshot = await getGameHistory('game_history', this.props.uid)

        gamesSnapshot.forEach((game) => {
            games.push({...game.data(), _id:game.id})
        });

        console.log(games)

         this.setState(() => ({ games }));
    }
    
    
    render() {
        return (
            <React.Fragment>
            <Link className="waves-effect waves-light btn-large blue" to="/quiz">Play Again</Link>
            <br/><br/>

            <table className="blue striped history">
                    <thead>
                        <tr className="purple darken-4">
                            <th>Quiz History</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th>Type</th>
                            <th>Score</th>
                            <th>Points</th>
                            <th>Details</th>
                        </tr>
                    </thead>
            
                    <tbody>
                        {this.state.games.map((game, i) => {
                            
                            const points = calculateGameResult(game.questions, game.answers).gamePoints;
                            const percentage = calculateGameResult(game.questions, game.answers).percentage;
                            return(
                                <tr key={i}>
                                    <td>{getFullDate(game.date.seconds)}</td>
                                    <td>{game.options.category}</td>
                                    <td>{game.options.difficulty}</td>
                                    <td>{game.options.type}</td>
                                    <td>{ percentage }%</td>
                                    <td>{ points }</td>
                                    <td><Link className="waves-effect waves-light btn-small purple darken-4"
                                            to={`/game_details/${game._id}`}>Details
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                           
                    </tbody>
          </table>
          </React.Fragment>     
        );
    }
}

const mapStateToProps = (state) => {
    return { 
             uid: state.authenticated.user? state.authenticated.user.uid: null
           }
  }
  

export default connect(mapStateToProps)(QuizHistory);