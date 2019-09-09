import React from 'react';
import axios from 'axios';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Toastr from 'toastr';
import TagsInput from 'react-tagsinput';
import autocompleteRenderInput, {setSuggestions} from './TagsAutoCompleteComponent';

export default class AddPost extends React.Component {
    constructor(props) {
      super(props);
      this.addPost = this.addPost.bind(this);
      
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleContentChange = this.handleContentChange.bind(this);
      this.handleTagsChange = this.handleTagsChange.bind(this);
      this.getSuggestions = this.getSuggestions.bind(this);
      this.getUser = this.getUser.bind(this);
      this.handlePostTypeChange = this.handlePostTypeChange.bind(this);
      this.state = {
        title:'',
        content:'',
        tags:[],
        suggestions: [],
        postType: 'TypeA',
        user: {userType: 'NM'},
      };
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "active";
      document.getElementById('homeHyperlink').className = "inactive";
      document.getElementById('profileHyperlink').className = "inactive";
      document.getElementById('followUserHyperlink').className = "inactive";
      document.getElementById('followTagsHyperlink').className = "inactive";
      document.getElementById('feedHyperlink').className = "inactive";

      this.getSuggestions();
      this.getUser();
      
    }
    addPost(){

        const {history} =  this.props;

      axios.post('/api/post/addPost', {
        title: this.state.title,
        content: this.state.content,
        tags: this.state.tags,
        postType: this.state.user.userType == 'NM'? '':this.state.postType,
       
      })
      .then(function (response) {
        console.log('reponse from add post is ',response);
        Toastr.success(response.data.message);
       history.push('/home')
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    async getUser(){
      var self = this;
      axios.get('/api/auth/getUser', {
      })
      .then(function (response) {
        if(response){
            let user = response.data.payload;
            self.setState({user:user});
          
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
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
    

    handleTitleChange(e){
      this.setState({title:e.target.value})
    }
    handleContentChange(e){
      this.setState({content:e.target.value})
    }

    // handleTagsChange(e){
    //     this.setState({tags:e.target.value})
    //   }
    handleTagsChange(tags){
        console.log("Tags" + tags);
        this.setState({tags:tags})
      }

      handlePostTypeChange(e) {
        console.log("Event -> " + e.target);
        this.setState({postType:e.target.value})
      }
    render() {

      let postTypeSection = this.state.user.userType == 'NM' ? <div></div> 
      : <div className='form-group'>
      <select className='form-control' onChange={this.handlePostTypeChange} id='postTypeSelect'>
        <option value='TypeA' defaultChecked>Type A</option>
        <option value='TypeB'>Type B</option>
      </select>
    </div>;
      return (
        <div>
        <Header/>

        
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.title} type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
               
                <div className="form-group">
                  <textarea value={this.state.content} className="form-control" onChange={this.handleContentChange} type="textarea" id="subject" placeholder="Content" maxLength="140" rows="7"></textarea>
                </div>

                {postTypeSection}

                <div className="form-group">
                <div className="col-sm-8" style={{paddingBottom: '15px'}}>
                  {/* <input value={this.state.tags} type="text" onChange={this.handleTagsChange} className="form-control" id="tags" name="tags" placeholder="Tags"/> */}
                  <TagsInput renderInput={autocompleteRenderInput} value={this.state.tags}
                                       onChange={this.handleTagsChange} className="form-control" id="tags" name="tags" placeholder="Tags"/>

                </div>
                </div>
                  
                <button type="button" onClick={this.addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>
          </div>
        </div>
        {/* <Footer/> */}
        </div>
      )
    }
}
