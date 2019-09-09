import React from 'react';
import axios from 'axios';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import InfiniteScroll from 'react-infinite-scroll-component';


const style = {
  height: 80,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

const delay = ms => new Promise(res => setTimeout(res, ms));

export default class ShowFeed extends React.Component {
    constructor(props) {
      super(props);
      this.updatePost = this.updatePost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.getPost = this.getPost.bind(this);
      this.handleNextPageClick = this.handleNextPageClick.bind(this);
      this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
      //this.handleScroll = this.handleScroll.bind(this);
      this.state = {
        pageNo: 1,
        isNextEnabled: true,
        isNextPage: true,
        totalsFollowedPost: {
            posts: [],
            nextCount: 0,
        },
        totalsTypeAPost: {
            posts: [],
            nextCount: 0,
        },
        totalsTypeBPost: {
            posts: [],
            nextCount: 0,
        }
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
      
      
      axios.get('/api/post/getFeed'
      , {params: {
        nextPostFollowedCount: this.state.totalsFollowedPost.nextCount,
        nextPostTypeACount: this.state.totalsTypeAPost.nextCount,
        nextPostTypeBCount: this.state.totalsTypeBPost.nextCount,
        pageNo:this.state.pageNo, 
        isNextPage: this.state.isNextPage,
      }
      })
      .then(function (response) {
        console.log('res is ',response);
        self.setState({
            totalsFollowedPost:{posts:[...self.state.totalsFollowedPost.posts
                                ,...response.data.payload.totalsFollowedPost.posts],
                                nextCount:response.data.payload.totalsFollowedPost.nextCount}
            ,totalsTypeAPost:{posts:[...self.state.totalsTypeAPost.posts
                            ,...response.data.payload.totalsTypeAPost.posts],
                                nextCount:response.data.payload.totalsTypeAPost.nextCount}
            ,totalsTypeBPost:{posts:[...self.state.totalsTypeBPost.posts
                              ,...response.data.payload.totalsTypeBPost.posts],
                                nextCount:response.data.payload.totalsTypeBPost.nextCount}
            ,isNextEnabled:response.data.payload.isNextEnabled
            ,pageNo:self.state.pageNo+1});
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }
    

    componentDidMount(){
      
      //window.addEventListener('scroll', this.handleScroll, true);
      document.getElementById('homeHyperlink').className = "inactive";
      document.getElementById('addHyperLink').className = "inactive";
      document.getElementById('profileHyperlink').className = "inactive";
      document.getElementById('followUserHyperlink').className = "inactive";
      document.getElementById('followTagsHyperlink').className = "inactive";
      document.getElementById('feedHyperlink').className = "active";

    console.log("componentDidMount -> After Page No -> ", this.state.pageNo);

    console.log("componentDidMount -> Calling getPost");

    this.getPost();

    }

    // async handleScroll(e) {

    //     await delay(5000);
    //     console.log("scrolled -> ", e.target);
    //     if(this.state.isNextEnabled)
    //         this.getPost();
        
    //     //alert("Scrolled");
    // }

     handlePreviousPageClick() {

        //let pageNo = this.state.pageNo - 1;

        //console.log("handlePreviousPageClick -> Page No -> ", pageNo);

        
        this.state.pageNo = this.state.pageNo - 1;

        if(this.state.pageNo  == 1){
            

            this.state.isPrevEnabled = false; 
        
            this.state.isNextPage = false;   
            //this.setState({pageNo:pageNo, isPrevEnabled:false, isNextPage: false});
        }else{
            this.state.isPrevEnabled = true; 
        
            this.state.isNextPage = false; 
            //this.setState({pageNo:pageNo, isPrevEnabled:true, isNextPage: false});
        }

        console.log("handlePreviousPageClick -> After Page No -> ", this.state.pageNo);

        console.log("handlePreviousPageClick -> Calling getPost");
        this.getPost();
        
    }

    handleNextPageClick() {

        this.state.pageNo = this.state.pageNo + 1;

        this.state.isPrevEnabled = true; 
        this.state.isNextEnabled = true; 
        this.state.isNextPage = true;

        console.log("handleNextPageClick -> Page No -> ", this.state.pageNo);

        
        
        //this.setState({pageNo:pageNo, isPrevEnabled:true, isNextEnabled:true, isNextPage: true});

        console.log("handleNextPageClick -> After Page No -> ", this.state.pageNo);

        console.log("handleNextPageClick -> Calling getPost");

        this.getPost();
        
    }

    render() {

        let followedCount = 0;
        let typeACount = 0;
        let typeBCount = 0;
        let totalPosts = this.state.totalsFollowedPost.posts.length
            + this.state.totalsTypeAPost.posts.length
            + this.state.totalsTypeBPost.posts.length;

        let followedPostsLength = this.state.totalsFollowedPost.posts.length;
        let typeAPostsLength = this.state.totalsTypeAPost.posts.length;
        let typeBPostsLength = this.state.totalsTypeBPost.posts.length;

        let sequencedPosts = []; 
        while((followedCount + typeACount + typeBCount) <  totalPosts){
            

            console.log("Counts -> ", followedCount, typeACount, typeBCount);
        

        console.log("followedPostsLength -> ", followedPostsLength)
        if(followedCount < followedPostsLength){
            for(let i=0; i <= 1 
                && followedCount < followedPostsLength;
                 i++){

                     console.log("Pushing totalsFollowedPost item " +  followedCount);
                sequencedPosts.push(this.state.totalsFollowedPost.posts[followedCount]);
                
                followedCount++;
            }

            //followedCount = followedCount+2;

        }

        console.log("typeAPostsLength -> ", typeAPostsLength);
       
       let isTypeBPrinted = false;
       if(typeACount < typeAPostsLength && typeBCount >= typeBPostsLength){

           for(let i=0; i <= 1 
                && typeACount < typeAPostsLength;
                 i++){

                     console.log("Pushing totalsTypeAPost item " + typeACount );
                sequencedPosts.push(this.state.totalsTypeAPost.posts[typeACount]);
                
                typeACount++;
            }

            //typeACount = typeACount+2;
       
       }else if(typeACount < typeAPostsLength){
           console.log("Pushing totalsTypeAPost item " + typeACount);
           sequencedPosts.push(this.state.totalsTypeAPost.posts[typeACount]);
           typeACount = typeACount+1;
           isTypeBPrinted=true;
       }

           
            

      console.log("typeBPostsLength -> ", typeBPostsLength);
        if(typeACount >= typeAPostsLength && typeBCount < typeBPostsLength && !isTypeBPrinted){

           for(let i=0; i <= 1 
                && typeBCount < typeBPostsLength;
                 i++){

                console.log("Pushing totalsTypeBPost item " + typeBCount);
                sequencedPosts.push(this.state.totalsTypeBPost.posts[typeBCount]);
                
                typeBCount++;
            }

            //typeACount = typeACount+2;
       
       }else if(typeBCount < typeBPostsLength){
           console.log("Pushing totalsTypeBPost item " + typeBCount);
           sequencedPosts.push(this.state.totalsTypeBPost.posts[typeBCount]);
           typeBCount = typeBCount+1;   
        }
        

           

            //break;
    }

   

    console.log("sequencedPosts -> ", sequencedPosts);

        return(

        
        <div>
            <Header/>
        
       
       <div>
        
        

           
            <InfiniteScroll
                dataLength={sequencedPosts.length} 
                next={this.getPost}
                hasMore={this.state.isNextPage}
                // loader={this.state.isNextPage?<h4>Loading...</h4>: <h4>All record loaded...</h4>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
            >
        {sequencedPosts.map(function(post,index) {

            return <div style={style} key={index}> 
                    <div className='col-sm-3'><label className="control-label">S.No.:&nbsp;</label> <span>{index + 1}</span> </div>
                     <div className='col-sm-3'><label className="control-label">Title:&nbsp;</label> <span>{post.title}</span> </div>
                    <div className='col-sm-3'><label className="control-label">Tags:&nbsp;</label> <span>{post.tags}</span></div>
                    <div className='col-sm-3'><label className="control-label">Created At:&nbsp;</label> <span>{post.createdAt}</span> </div>
                     
                    <div className='col-sm-4'><label className="control-label">Content:&nbsp;</label><span>{post.content}</span></div>
                
                  </div>
         }.bind(this))
                } 
        </InfiniteScroll> 
       
        
        </div>
        </div>
       
        

    //        <div>
    //         <Header/>
    //         <table className="table table-striped">
    //           <thead>
    //             <tr>
    //               <th>#</th>
    //               <th>Title</th>
    //               <th>Subject</th>
    //               <th>Tags</th>
    //               <th>Created At</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //                <InfiniteScroll
    //              dataLength={sequencedPosts.length} //This is important field to render the next data
    //              next={this.getPost}
    //              hasMore={true}
    //              loader={<h4>Loading...</h4>}
    //              endMessage={
    //                  <p style={{textAlign: 'center'}}>
    //                  <b>Yay! You have seen it all</b>
    //                  </p>
    //              }
    //          >
              
    //             {
    //               sequencedPosts.map(function(post,index) {
    //                   if(post)
    //                  return <tr key={index} >
    //                           <td>{index+1}</td>
    //                           <td>{post.title}</td>
    //                           <td>{post.content}</td>
    //                           <td>{post.tags}</td>
    //                           <td>{post.createdAt}</td>
                              
    //                         </tr>
    //               }.bind(this))
    //             }
    //              </InfiniteScroll>
    //           </tbody>
    //         </table>
           
    //   </div>

    //         <div>
    //         <Header/>
    //         <table className="table table-striped">
    //           <thead>
    //             <tr>
    //               <th>#</th>
    //               <th>Title</th>
    //               <th>Subject</th>
    //               <th>Tags</th>
    //               <th>Created At</th>
    //             </tr>
    //           </thead>
    //           <tbody>
              
    //             {
    //               sequencedPosts.map(function(post,index) {
    //                   if(post)
    //                  return <tr key={index} >
    //                           <td>{index+1}</td>
    //                           <td>{post.title}</td>
    //                           <td>{post.content}</td>
    //                           <td>{post.tags}</td>
    //                           <td>{post.createdAt}</td>
                              
    //                         </tr>
    //               }.bind(this))
    //             }
                
    //           </tbody>
    //         </table>
    //         {/* <Footer/> 
 
    //         <button type="button" onClick={this.handlePreviousPageClick} id="submit" name="submit" className="btn btn-primary pull-left" disabled={!this.state.isPrevEnabled}>Previous Page</button>
    //         <button type="button" onClick={this.handleNextPageClick} id="submit" name="submit" className="btn btn-primary pull-right" disabled={!this.state.isNextEnabled}>Next Page</button>
    //   </div> 
          )
      }
  }