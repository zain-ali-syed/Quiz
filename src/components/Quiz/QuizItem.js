import React from 'react';

let nTimeout;

const QuizItem = ({
  category,
  type,
  difficulty,
  question,
  allAnswers,
  updateAnsweredQuestions,
  nextQuestion
}) => {
  return (
    <div className="card blue lighten-1 container" style={{ margin: '0 auto' }}>
      <div className="card-content white-text">
        <h3 dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div className="answers">
        {allAnswers.map(answer => (
          <div key={answer}>
            <button
              className="btn-large answer-button"
              type="button"
              style={{ margin: '10px' }}
              onClick={() => {
                clearTimeout(nTimeout);
                nTimeout = setTimeout(() => {
                  updateAnsweredQuestions(answer);
                  nextQuestion();
                }, 600);
              }}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </div>
        ))}
      </div>
      <div className="card-action" />
      <footer className="page-footer purple darken-4">
        <div>
          <span style={{ fontSize: '20px' }}>Difficulty: {difficulty} |</span>
          <span style={{ fontSize: '20px' }}> Category: {category} </span>
        </div>
      </footer>
    </div>
  );
};

export default QuizItem;
