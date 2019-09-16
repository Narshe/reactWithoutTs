import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from "../../store/UserProvider";
let axios = require('axios');


export default class Logout extends React.Component 
{
    static contextType  = UserContext;

    constructor(props) {
        super(props);
        this.state = { 
                redirect: false
            }
    }

    componentDidMount() {

        axios.get('/users/logout')
        .then( _ => {
    
            this.context.updateUser(null);
            localStorage.removeItem('user');
            this.setState({redirect: true});
        })
        .catch((err) => {
            console.log(err);
            this.setState({redirect: true});
        })
    
    }
 
    render() {

        let redirect = this.state.redirect && <Redirect to={`/`} />

        return (
            
            <div>
                {redirect}
            </div>
        )
    }
}