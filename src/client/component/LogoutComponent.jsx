import React from 'react';
import axios from 'axios';


export default class AddPost extends React.Component {
    
    componentWillMount(){
      axios.post('/api/auth/logout');
      this.props.history.push('/');
    }
    

  
    render() {
      return (
        <div>
        
        </div>
      )
    }
}
