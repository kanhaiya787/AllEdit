import React, {Component, Link} from 'react';
import socketIOClient from "socket.io-client";

 class Editor extends React.Component{

    constructor(){
        super();
        this.state = {
          endpoint: "http://localhost:4001",
          text:""
        };
      }
    
      send = (vall) => {
        console.log(15,"send methl");
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('send changes', vall) 

      }

      componentDidMount(){
     
        console.log(30,this.state.text);
        setInterval(() => {
         this.send(localStorage.getItem("editText")) 
        },5000);
        
        const socket = socketIOClient(this.state.endpoint);
        socket.on('send changes', (text) => {
          this.setState({
            text:text
          })
        });
      }
    
      changeText = (event) => {
        localStorage.setItem("editText",event.target.value);
      }
    
    render(){

      //let text=this.state.text;
      //console.log(26,text);
      
        return(

            <form>              
                <textarea rows="30" cols="100" onChange={this.changeText} value={this.state.text}></textarea> 
                <button>History</button>
            </form>
        )
    }

}

export default Editor;
