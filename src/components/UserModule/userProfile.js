import React from 'react';
import { Redirect } from 'react-router-dom';
import Post from '../PostModule/post';

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
                loaded: false
            }
    }

    componentDidMount() {
        
            axios.get('/users/profile')
            .then( (user) => {
        
                this.setState({user: user.data, loaded: true});
            })
            .catch((err) => {
                console.log(err);
                this.setState({redirect: true});
            })
    
    }
    


    render() {

        let redirect = this.state.redirect.hasTo && <Redirect to={this.state.redirect.to} />;
        let {user, loaded} = this.state;

        return (
            
            <div className="container">
                {redirect}
                <div className="row">
                    <div className="card col-12 col-md-9">
                        <div className="card-body">
                        <h5 className="card-title">Informations de l'utilisateur</h5>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <ul className="list-group col-12 col-md-3 px-md-2">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Morbi leo risus</li>
                        <li className="list-group-item">Porta ac consectetur ac</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
                { (loaded && user.posts.length > 0) ?
                    <div className="posts">
                        <h4>Articles de {user.name}</h4>
                        {
                            user.posts.map((post, index) => {
                                return <Post limit={5} key={`post_${index}`} post={post} />
                            })
                        }
                    </div>
                    :
                    <p>Aucun article pour le moment...</p>
                 
                }
            </div>
        )
    }
}