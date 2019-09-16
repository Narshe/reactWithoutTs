import React from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "../../store/UserProvider";

export default class Header extends React.Component {

    static contextType = UserContext;

    getLinks = () => {

        let links;
        if (this.context.user !== null) {

           links = (
            <div>
                <Link className="btn btn-sm btn-outline-secondary ml-3" to="/profile">{this.context.user.name}</Link>
                <Link className="btn btn-sm btn-outline-secondary ml-3" to="/logout">Se déconnecter</Link>
            </div>
           )
            
        } else {
            links = (
                <div>
                    <Link className="btn btn-sm btn-outline-secondary" to="/login">Se connecter</Link>
                    <Link className="btn btn-sm btn-outline-secondary ml-3" to="/register">S'inscrire</Link>
                </div>
            )     
        }

        return links
    }

    render() {


        let links = this.getLinks();
        return  (

            <div className="container header-container">
                <header className="blog-header py-3">
                    <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 text-center">
                        <a className="blog-header-logo text-dark" href="#top">Large</a>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                      
                        { links }
                       
                    </div>
                    </div>
                </header>

                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex justify-content-between">
                        <Link className="p2 text-muted" to="/">Accueil</Link>
                        <Link className="p2 text-muted" to="/posts">Articles</Link>
                    </nav>
                </div>

            </div>

        )   
   }
}




