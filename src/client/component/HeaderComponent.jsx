import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';


export default class Home extends React.Component {


  render() {

    

    return (

      <div className="container">
        <div className="header clearfix">
          <nav>
            <ul className="nav nav-pills pull-right">
              <li role="presentation" id="homeHyperlink" className="active"><Link to="/home">{'Home'}</Link></li>
              <li role="presentation" id="feedHyperlink"><Link to="/showFeed">{'Feed'}</Link></li>
              <li role="presentation" id="addHyperLink"><Link to="/addPost">{'Add Post'}</Link></li>
              <li role="presentation" id="profileHyperlink"><Link to="/showProfile">{'Profile'}</Link></li>
              <li role="presentation" id="followUserHyperlink"><Link to="/followUser">{'Follow User'}</Link></li>
              <li role="presentation" id="followTagsHyperlink"><Link to="/followTags">{'Follow Tags'}</Link></li>
              <li role="presentation"><Link to="/logout">{'Logout'}</Link></li>
            </ul>
          </nav>
          <h3 className="text-muted">Peerlyst Post App</h3>

        </div>






      </div>

    )
  }
}