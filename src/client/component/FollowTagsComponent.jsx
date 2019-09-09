import React from 'react';
import axios from 'axios';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Toastr from 'toastr';
import TagsInput from 'react-tagsinput';
import autocompleteRenderInput, {setSuggestions} from './TagsAutoCompleteComponent';

export default class FollowTags1 extends React.Component {
    constructor(props) {
      super(props);
      this.submitFollowTags = this.submitFollowTags.bind(this);
      
      this.getSuggestions = this.getSuggestions.bind(this);
      this.handleTagsChange = this.handleTagsChange.bind(this);
      
      this.state = {
       
        tags:[],
        suggestions: [],
      };
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "inactive";
      document.getElementById('homeHyperlink').className = "inactive";
      document.getElementById('profileHyperlink').className = "inactive";
      document.getElementById('followUserHyperlink').className = "inactive";
      document.getElementById('followTagsHyperlink').className = "active";
      document.getElementById('feedHyperlink').className = "inactive";
      this.getSuggestions();
      
    }
    submitFollowTags(){

        const {history} =  this.props;

      axios.post('/api/follow/tags', {
       
        tags: this.state.tags,
       
      })
      .then(function (response) {
        console.log('reponse from follow tags  is ',response);
        Toastr.success(response.data.message);
       history.push('/home')
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    async getSuggestions(){
      let response = await axios.get('/api/post/getPost');
      let suggestions =[];
      if(response.data.payload) {
        response.data.payload.map(post => {
          suggestions = Array.from(new Set([...suggestions, ...post.tags]));
        })
      }
      
      setSuggestions(suggestions);

      this.setState({suggestions:suggestions});
      
  }

   

    // handleTagsChange(e){
    //     this.setState({tags:e.target.value})
    //   }
    handleTagsChange(tags){
        console.log("Tags" + tags);
        this.setState({tags:tags})
      }
    render() {
      return (
        <div>
        <Header/>

        
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <label className="control-label col-sm-4">Follow Tags:</label>
                
                <div className="form-group">
                <div className="col-sm-8" style={{paddingBottom: '15px'}}>
                  {/* <input value={this.state.tags} type="text" onChange={this.handleTagsChange} className="form-control" id="tags" name="tags" placeholder="Tags"/> */}
                  <TagsInput suggestions={this.state.suggestions} renderInput={autocompleteRenderInput} value={this.state.tags}
                                       onChange={this.handleTagsChange} className="form-control" id="tags" name="tags" placeholder="Add a tag"/>

                </div>
                </div>
                  
                <button type="button" onClick={this.submitFollowTags} id="submit" name="submit" className="btn btn-primary pull-right">Follow Tags</button>
              </form>
          </div>
          
        </div>
        {/* <Footer/> */}
        </div>
      )
    }
}


