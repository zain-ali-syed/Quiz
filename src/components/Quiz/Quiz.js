import React, { Component } from 'react';
import { connect } from 'react-redux';


const dropdownStyle = { width:"20%", margin:"0 auto", fontSize:"15px", height:"60px", marginBottom:"10px" }
const aCategories = require('../../category.json').trivia_categories;

class Quiz extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push( { pathname: '/quiz_list', options: this.props.options } )      
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                    <select className="browser-default select-style" style={dropdownStyle} id="category" onChange={this.props.handleChange}>
                        <option value=""  selected>Any category</option>
                        { aCategories.map((category) => (
                            <option value={ category.id } key = {category.id}  >{category.name}</option>
                        ))}
                       
                    </select>

                    <select className="browser-default" style={dropdownStyle} id="difficulty" onChange={this.props.handleChange}>
                        <option value="">Any difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <select className="browser-default" style={dropdownStyle} id="type" onChange={this.props.handleChange}>
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True or False</option>
                    </select>

                    <select className="browser-default" style={dropdownStyle} id="amount" onChange={this.props.handleChange}>
                        <option value="" disabled selected>Number of questions</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <br/>
                    <button className="waves-effect waves-light btn-large purple darken-4" type="submit">Let's start!!!</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return { options: state.options }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
       handleChange: (e) => {
           dispatch({ type:"SELECT_QUIZ_TYPE", e })
       }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
  