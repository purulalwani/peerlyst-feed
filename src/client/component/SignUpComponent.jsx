import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Toastr from 'toastr';

export default class Signup extends React.Component{
    constructor(props) {
      super(props);
      this.signUp = this.signUp.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
      this.state = {
        name:'',
        email:'',
        password:'',
        userType: 'NM',
      };
    }
    handleNameChange(e){
      this.setState({name:e.target.value})
    }
    handleEmailChange(e){
      this.setState({email:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }
    handleUserTypeChange(e){

      console.log("User Type -> ", e);
      this.setState({userType:e.target.value})
    }
    signUp(){

        const {history} = this.props;
      axios.post('/api/auth/register', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        userType: this.state.userType,
      })
      .then(function (response) {
          
        console.log(response);
        Toastr.success(response.data.message);
        history.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    render() {
        return (
          <div className='col-md-5'>
            <form className="form-signin">
              <h2 className="form-signin-heading">Please sign up</h2>
              <br/>
              <label htmlFor="inputName" className="sr-only">Name</label>
              <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" required autoFocus />
              <br/>
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required />
              <br/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
              <br/>
              <label htmlFor="inputUserType" className="sr-only">User Type</label>
              <input type="radio" value="CM" name="inputUserType"  onChange={this.handleUserTypeChange}/>  <span style={{paddingRight: '15px'}}>Community Manager</span>  
              <input type="radio" value="NM" name="inputUserType"  defaultChecked onChange={this.handleUserTypeChange}/>  <span style={{paddingRight: '15px'}}>Normal Member </span>
              <br/>
              <br/>
              <br/>
              <button className="btn btn-lg btn-primary btn-block" onClick={this.signUp} type="button">Sign up</button>
            </form>
            <br/>
            <div>
              <Link to="/">{'Signin'}</Link>
            </div>
          </div>
          
        )
    }
  }