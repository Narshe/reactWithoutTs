import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";

import Header from './components/partials/header';
import Footer from './components/partials/footer';
import Home from './components/home';
import Login from './components/UserModule/login';
import Register from './components/UserModule/register';
import Logout from './components/UserModule/logout';
import Profile from './components/UserModule/profile';
import UserProfile from './components/UserModule/userProfile';
import PostList from './components/PostModule/postList';
import Post from './components/PostModule/post';
import NewPost from './components/PostModule/newPost';
import withAuth from './components/withAuth';


class App extends Component {

  render() {
    return (  
        <Router>
          <React.StrictMode>
            <Header />
              <main role="main" className="container main">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/posts" exact component={PostList} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/profile" exact component={withAuth(UserProfile)} />
                  <Route path="/profile/:id" exact component={Profile} />
                  <Route path="/logout" exact component={withAuth(Logout)} />
                  <Route path="/posts/new" exact component={withAuth(NewPost)} />
                  <Route path="/posts/:id" component={Post} />
                </Switch> 
              </main>
            <Footer />
          </React.StrictMode>
        </Router>
    );
  }
}

export default App;
