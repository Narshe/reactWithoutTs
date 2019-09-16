import React, { createContext, Component } from "react";



export const UserContext = createContext({
    user: null,
});

export default class UserProvider extends Component 
{

    constructor(props) {
        
        super(props);
        this.state = {
            user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
            updateUser: this.updateUser
        }
    }

    updateUser = (user) => {

      this.setState({user: user});
    }

    render() {
        return (
          <UserContext.Provider value={this.state}>
            {this.props.children}
          </UserContext.Provider>
        );
      }
}