import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getLeaderboard } from '../utils';

class QuizLeaderBoard extends Component {
  // state
  state = {
    leaderboard: []
  };

  componentDidMount() {
    this.getUserScores();
  }

  getUserScores = async () => {
    const users = [];
    const usersSnapshot = await getLeaderboard();

    usersSnapshot.forEach(user => {
      users.push({
        display_name: user.data().display_name,
        score: user.data().points
      });
    });

    this.setState(() => ({ leaderboard: users.reverse() }));
  };

  render() {
    return (
      <React.Fragment>
        <Link className="waves-effect waves-light btn-large blue" to="/quiz">
          Play Again
        </Link>
        <br /> <br />
        <table className="blue striped history container">
          <thead>
            <tr className="purple darken-4">
              <th>Leaderboard</th>
              <th />
            </tr>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {this.state.leaderboard.map((user, i) => {
              return (
                <tr key={user.display_name}>
                  <td>{user.display_name}</td>
                  <td>{user.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default QuizLeaderBoard;
