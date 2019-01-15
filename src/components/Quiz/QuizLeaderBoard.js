import React, { Component } from 'react';
import {getLeaderboard} from '../utils';

class QuizLeaderBoard extends Component {

    //state
    state = {
        leaderboard: []
    }

    componentDidMount()
    {
        this.getUserScores();
    }

    getUserScores = async () => {

    
        const users = [];
        const usersSnapshot = await getLeaderboard();

        usersSnapshot.forEach((user) => {
            users.push({ display_name:user.data().display_name, score:user.data().points})
        });

        this.setState(() => ({ leaderboard: users.reverse() }));
    }

    render() {
        return (
            <React.Fragment>
            <table className="blue striped history container">
                    <thead>
                        <tr>
                            <th>Leaderboard</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
            
                    <tbody>
                        {this.state.leaderboard.map((user, i) => {
                         return(
                                <tr key={i}>
                                    <td>{user.display_name}</td>
                                    <td>{user.score}</td>
                                </tr>
                            )
                        })}
                           
                    </tbody>
          </table>
          </React.Fragment>     
        );
    }
}

export default QuizLeaderBoard;