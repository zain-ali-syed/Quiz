import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGameHistory } from '../utils';
import { calculateGameResult, getFullDate } from './quiz_utils';

const oCategories = {};
require('../../category.json').trivia_categories.forEach(({ id, name }) => {
  oCategories[id] = name;
});

class QuizHistory extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    this.getGameHistory();
  }

  getGameHistory = async () => {
    const games = [];
    const gamesSnapshot = await getGameHistory('game_history', this.props.uid);

    gamesSnapshot.forEach(game => {
      games.push({ ...game.data(), _id: game.id });
    });

    this.setState(() => ({ games }));
  };

  render() {
    return (
      <React.Fragment>
        <Link className="waves-effect waves-light btn-large blue" to="/quiz">
          Play Again
        </Link>
        <br />
        <br />

        <table className="blue striped history">
          <thead>
            <tr className="purple darken-4">
              <th>Quiz History</th>
              <th />
              <th />
              <th />
              <th />
              <th />
              <th />
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
              const points = calculateGameResult(game.questions, game.answers)
                .gamePoints;
              const percentage = calculateGameResult(
                game.questions,
                game.answers
              ).percentage;

              return (
                <tr key={i}>
                  <td>{getFullDate(game.date.seconds)}</td>
                  <td>
                    {game.options.category !== ''
                      ? oCategories[game.options.category]
                      : 'random'}
                  </td>
                  <td>
                    {game.options.difficulty !== ''
                      ? game.options.difficulty
                      : 'random'}
                  </td>
                  <td>
                    {game.options.type !== '' ? game.options.type : 'random'}
                  </td>
                  <td>{percentage}%</td>
                  <td>{points}</td>
                  <td>
                    <Link
                      className="waves-effect waves-light btn-small purple darken-4"
                      to={`/game_details/${game._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.authenticated.user ? state.authenticated.user.uid : null
  };
};

export default connect(mapStateToProps)(QuizHistory);
