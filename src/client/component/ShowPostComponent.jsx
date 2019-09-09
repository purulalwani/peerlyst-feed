import React from 'react';
import axios from 'axios';
import Header from './HeaderComponent';
import Footer from './FooterComponent';


export default class ShowPost extends React.Component {
    constructor(props) {
      super(props);
      this.updatePost = this.updatePost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.getPost = this.getPost.bind(this);
      this.state = {
        posts:[]
      };
      
    }

    updatePost(id){
      hashHistory.push('/addPost/' + id);
    }

    deletePost(id){
      if(confirm('Are you sure ?')){
        var self = this;
        axios.post('/deletePost', {
          id: id
        })
        .then(function (response) {
          self.getPost();
        })
        .catch(function (error) {
          console.log('Error is ',error);
        });
      }
    }

    getPost(){
      var self = this;
      axios.get('/api/post/getPost', {
      })
      .then(function (response) {
        console.log('res is ',response);
        self.setState({posts:response.data.payload})
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }
    

    componentDidMount(){
      this.getPost();

      document.getElementById('homeHyperlink').className = "active";
      document.getElementById('addHyperLink').className = "inactive";
      document.getElementById('profileHyperlink').className = "inactive";
      document.getElementById('followUserHyperlink').className = "inactive";
      document.getElementById('followTagsHyperlink').className = "inactive";
      document.getElementById('feedHyperlink').className = "inactive";
    }
    render() {

        return(
            <div>
            <Header/>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Tags</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.posts.map(function(post,index) {
                     return <tr key={index} >
                              <td>{index+1}</td>
                              <td>{post.title}</td>
                              <td>{post.content}</td>
                              <td>{post.tags}</td>
                              <td>{post.createdAt}</td>
                            </tr>
                  }.bind(this))
                }
              </tbody>
            </table>
            {/* <Footer/> */}
      </div>
          )
      }
  }