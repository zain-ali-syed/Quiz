import React from 'react';


const QuizItem = ( { category, type, difficulty, question, allAnswers, updateAnsweredQuestions } ) => {
    
    
    return (
       
            <div className="card blue lighten-1 container" style={{margin:"0 auto"}}>
                <div className="card-content white-text">
                    <h3 dangerouslySetInnerHTML={{ __html: question }} />
                </div>
                <div className="answers">
                    { allAnswers.map( (answer) => (
                        <div key = { answer }>
                            <button className="waves-effect waves-light blue darken-4 btn-large answer-button"
                                    style={{ margin:"10px" }}
                                    onClick = { () => { updateAnsweredQuestions(answer) } }
                                    dangerouslySetInnerHTML={{ __html: answer }}
                                    >
                            </button>
                        </div>
                    ))}
                </div>
                <div className="card-action">
                </div>
                <footer className="page-footer purple darken-4">
                    <div>
                        <span style={{fontSize:'20px'}}>Difficulty: {difficulty} |</span>
                        <span style={{fontSize:'20px'}}> Category: {category} </span>
                    </div>
               </footer>
            </div>
       
    );
};


export default QuizItem;

