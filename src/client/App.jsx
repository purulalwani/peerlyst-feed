import React from 'react';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import '../../public/css/bootstrap.min.css';
import '../../public/css/app.css';
import '../../public/css/toastr.min.css';
import 'react-tagsinput/react-tagsinput.css';


import Home from './component/HomeComponent';
import Signin from './component/SignInComponent';
import Signup from './component/SignUpComponent';
import AddPost from './component/AddPostComponent';
import ShowPost from './component/ShowPostComponent';
import ShowProfile from './component/ShowProfileComponent';

import Logout from './component/LogoutComponent';

import FollowUserComponent from './component/FollowUserComponent';
import FollowTagsComponent from './component/FollowTagsComponent';

import ShowFeedComponent from './component/ShowFeedComponent';

class App extends React.Component {
  state = { username: null };

  componentDidMount() {
  //   fetch('/api/getUsername')
  //     .then(res => res.json())
  //     .then(user => this.setState({ username: user.username }));
   }

  render() {
    
    return (
    <Router>
    
        <Route exact path="/" component={Signin} ></Route>
        {/* <Route exact path="/home" component={Home} ></Route> */}
        <Route exact path="/signup" component={Signup} ></Route>
        <Route exact path="/logout" component={Logout} ></Route>
        <Route exact path="/home" component={ShowPost} ></Route>
        <Route exact path="/addPost" component={AddPost} ></Route>
        <Route exact path="/followUser" component={FollowUserComponent} ></Route>
        <Route exact path="/followTags" component={FollowTagsComponent} ></Route>
        <Route exact path="/showProfile" component={ShowProfile} ></Route>
        <Route exact path="/showFeed" component={ShowFeedComponent} ></Route>
    
    </Router>
    
    );
  }
}

export default App;