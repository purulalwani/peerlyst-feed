import React from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

export default class Home extends React.Component {


    render() {

        return (

      <div>
            <Header/>
        <div id="app" >
        
      </div>
      <Footer/>
      </div>
      
        )
    }
}