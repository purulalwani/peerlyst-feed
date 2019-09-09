import React from 'react';
import axios from 'axios';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Toastr from 'toastr';
import TagsInput from 'react-tagsinput';

import UserAutoCompleteComponent from './UserAutoCompleteComponent';

export default class FollowUser extends React.Component {
    constructor(props) {
      super(props);
      this.submitFollowUser = this.submitFollowUser.bind(this);
      
     
      this.handleTagsChange = this.handleUserChange.bind(this);
      this.getSuggestions = this.getSuggestions.bind(this);
      this.state = {
       
        userValue: [],
        user:null,
        suggestions: [],
      };
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "inactive";
      document.getElementById('homeHyperlink').className = "inactive";
      document.getElementById('profileHyperlink').className = "inactive";
      document.getElementById('followUserHyperlink').className = "active";
      document.getElementById('followTagsHyperlink').className = "inactive";
      document.getElementById('feedHyperlink').className = "inactive";

      this.getSuggestions();
      
    }
    submitFollowUser(){

        const {history} =  this.props;

      axios.post('/api/follow/user', {
       
        to: this.state.user,
       
      })
      .then(function (response) {
        console.log('reponse from follow user is ',response);
        Toastr.success(response.data.message);
       history.push('/home')
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    

    async getSuggestions(){
        let response = await axios.get('/api/auth/getAllUser');

        this.setState({suggestions:response.data.payload});
        
    }
   

    // handleTagsChange(e){
    //     this.setState({tags:e.target.value})
    //   }
    handleUserChange(user, currentThis){
        console.log("User -> ", user);
        currentThis.setState({user:user})
      }
    render() {

        console.log("Suggestions -> ", this.state.suggestions);
        
      return (
        <div>
        <Header/>

        
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <label className="control-label col-sm-4">Follow User:</label>

                <div className="form-group">
                <div className="col-sm-8" style={{paddingBottom: '15px'}}>
                  {/* <input value={this.state.user} type="text" onChange={this.handleUserChange} className="form-control" id="user" name="user" placeholder="User"/> */}
                  {/* <TagsInput renderInput={autocompleteRenderInput} value={this.state.userValue}
                                       onChange={this.handleUserChange} className="form-control" id="user" name="user" placeholder="Tags"/> */}
                <UserAutoCompleteComponent parentObj={this} handleSelection={this.handleUserChange} suggestions={this.state.suggestions}/>
                </div>
                </div>
                  
                <button type="button" onClick={this.submitFollowUser} id="submit" name="submit" className="btn btn-primary pull-right">Follow User</button>
              </form>
          </div>
        </div>
        {/* <Footer/> */}
        </div>
      )
    }
}
