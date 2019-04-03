import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import changeNameAction from '../redux/actions';

class LandingPage extends Component {
    state = {name: 'adaeze'};

    login = () => {
        return this.props.changeName();
    }
    
    render() { 
        return(
            <div>
                <header>
                Welcome to Author's haven frontend
                </header>
                <section>
                    <Link to ="profile">
                        Profile
                    </Link>
                </section>
                <section>
                    <button onClick={this.login}>{this.props.name}</button>
                </section>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        changeName: () => dispatch(changeNameAction())
    }
}

function mapStateToProps({ name }) {
    return { name: name.name };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);