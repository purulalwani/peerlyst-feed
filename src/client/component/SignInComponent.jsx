import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Toastr from 'toastr';

export default class Signin extends React.Component {
    constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        email:'',
        password:''
      };
    }
    signIn(){

        let {history} = this.props;
      axios.post('/api/auth/login', {
       // axios.post('/api/getUsername', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        if(response.data.status == 200){
          history.push('/home');
        } else {
            console.log(response);
            Toastr.error(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        
      });
    }
    handleEmailChange(e){
      this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }
    render() {
      return (
        <div className='col-md-5'>
          <form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <br/>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <br/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
            <br/>
            <button className="btn btn-lg btn-primary btn-block" onClick={this.signIn} type="button">Sign in</button>
          </form>
          <br/>
          <div>
            <Link className='pull-center'to="/signup">{'Signup'}</Link>
          </div>
        </div>

      )
    }

}