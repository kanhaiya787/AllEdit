import React, {Component, Link} from 'react';
import Editor from './Editor';
import '../App.css'

 class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name:"",
            room:"",
            showEditor:false
        }
    }

    submit =() => {
      let name = this.state.name!= undefined ? this.state.name : "";
      let room=this.state.room!= undefined ? this.state.room : "";
      console.log(16,name,room);

      if(room!="" && name!=""){
         sessionStorage.setItem("entered",true);
         this.setState({
             showEditor:true
         },() => {
             window.location.replace("http://localhost:3000/editor");
         })
      }
      else{
          alert("Fill all the details!!")
      }
       
    }

    handleName =(e) => {
        this.setState({
            name:e.target.value
        })
    }
    handleRoom =(e) => {
        this.setState({
            room:e.target.value
        })
    }

    render(){
        return(
            <div>
            {this.state.showEditor ? <Editor name={this.state.name} room={this.state.room}/> : 
            <form>
                <h5 className="text">JOIN:</h5>
                <input className="input" type="text" onChange = {this.handleRoom}/><h5 className="text">PROJECT AS:</h5>
                <input className="input" onChange = {this.handleName} type="text"/><br/><br/>
                <button class="button" onClick={this.submit}><span>Connect </span></button>
            </form>}
            </div>
        )
    }

}

export default Home;
