import React from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from "../../store/UserProvider";
let axios = require('axios');


export default class Profile extends React.Component 
{
    static contextType  = UserContext;

    constructor(props) {
        super(props);
        this.state = { 
                user: {},
                redirect: {to: '/', hasTo: false},
            }
    }

    componentDidMount() {
        
        let urlId = parseInt(this.props.match.params.id);

        if(this.context.user && urlId === parseInt(this.context.user.id)) {

            this.setState({redirect: {to:'/profile', hasTo:true}})
        }
        else {
            axios.get(`/users/${urlId}` )
            .then( (user) => {
        
                this.setState({user: user.data, loaded: true});
            })
            .catch((err) => {
                console.log(err);
                this.setState({redirect: true});
            })
        }
     
    
    }
    

    render() {

        let redirect = this.state.redirect.hasTo && <Redirect to={this.state.redirect.to} />;
        let {user} = this.state;

        return (
            
            <div>
                {redirect}
                <div class="card">
                    <div class="card-body">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
              

            </div>
        )
    }
}