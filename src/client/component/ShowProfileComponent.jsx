import React from 'react';
import axios from 'axios';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

export default class ShowProfile extends React.Component {
    constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.updateProfile = this.updateProfile.bind(this);
      this.getProfile = this.getProfile.bind(this);
      this.state = {
        name:'',
        email:'',
        password:'',
        id:''
      };
      
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "inactive";
      document.getElementById('homeHyperlink').className = "inactive";
      document.getElementById('profileHyperlink').className = "active";
      document.getElementById('followUserHyperlink').className = "inactive";
      document.getElementById('followTagsHyperlink').className = "inactive";
      document.getElementById('feedHyperlink').className = "inactive";
      this.getProfile();
    }
    updateProfile(){
      
      var self = this;
      axios.post('/updateProfile', {
        name: this.state.name,
        password: this.state.password
      })
      .then(function (response) {
        if(response){
          hashHistory.push('/')  
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }

    handleNameChange(e){
      this.setState({name:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }

    getProfile(){
      var self = this;
      axios.get('/api/auth/getUser', {
      })
      .then(function (response) {
        if(response){
            let user = response.data.payload;
          self.setState({name:user.name});
          self.setState({email:user.email});
          self.setState({password:user.password});  
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }
    
    render() {
      return (
          <div><Header/>
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className='form-group'>
                
                  <label className="control-label">Name:&nbsp;</label> <span>{this.state.name}</span> 
                
                </div>
               
                 <div className='form-group'>
                
                  <label className="control-label">Email:&nbsp;</label> <span>{this.state.email}</span> 
                
                </div>
               
                
              </form>
          </div>
        </div>
        {/* <Footer/> */}
        </div>
      )
    }
}
