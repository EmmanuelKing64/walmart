import React, { Component } from 'react';
import {getEntities} from '../actions';
import { connect } from "react-redux";
import axios from 'axios';
const api = axios.create({
    baseURL:'https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/1/8'
})

export const mapStateToProps = state => ({
    data:state.productReducer.data,
    value:state.productReducer.temp
  });
  export const mapDispatchToProps = dispatch => ({
    // startAction: () => dispatch(getEntities)
  })
  
class parent extends Component {
    state={
        value:{}
    }
 
    constructor(){ 
        super();
       api.get('/').then(res =>{console.log(res.data,'check')
    this.setState({value:res.data},()=>{})
})
        
       
    }
    // componentDidMount(){
    //     this.props.startAction();
    //   }
    render() {console.log('yes',this.state.value)
        return (
            <div>
                hello
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(parent);