import React, {Component, Link} from 'react';
import socketIOClient from "socket.io-client";
import History from "./History";
import Axios from 'axios';

 class Editor extends React.Component{


    constructor(props){
        super(props);

        this.state = {
          text:"",
          endpoint: "http://localhost:4001",
          showHistory:false,
          history:""
        }
        this.socket =  socketIOClient(this.state.endpoint);

      }
    
      send = (vall) => {
          this.socket.emit('send changes', vall);
      }



      componentDidMount(){
              
        this.socket.on('send changes', (texts) => {
          this.setState({
            text:texts
          })
        });
      }
    
      changeText = (event) => {
        this.setState({
          text:event.target.value
        },() =>  {this.send(this.state.text)}
      );
      }

    showHistory = (e) => {
      Axios.get('http://localhost:4001/get/room1').then((res ) => {
         this.setState({
           history:res.data
         })
      }).catch(err => {

      });
      this.setState({
        showHistory:!this.state.showHistory
      })

      e.preventDefault();
		  e.stopPropagation();
    }

    saveData = (e)=>{

      console.log(this);
      this.socket.emit('save data', this.state.text);
      e.preventDefault();
		  e.stopPropagation();
    }
    
    
    render(){

      let text=this.state.text;
      let name = this.props.name;
      let room = this.props.room;
      console.log(74,name,room)
      
        return(
            <div>
            <form>              
                <textarea rows="30" cols="100" onChange={this.changeText} value={text}
                   ></textarea> 
                <button onClick = {this.showHistory}>History</button>
                <button onClick = {this.saveData}>Save</button>
            </form>
            {this.state.showHistory ? <History data={this.state.history}/> : null}
            </div>
        )
    }

}

export default Editor;
