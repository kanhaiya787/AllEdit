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
          history:"",
            username:this.props.name,
            roomname:this.props.room,
            userList:[]
        }
        this.socket =  socketIOClient(this.state.endpoint,{ query: "roomname="+this.state.roomname+"&username="+this.state.username });

      }
    
      send = (vall) => {
          this.socket.emit('send changes', {"roomname":this.state.roomname,"data":vall});
      }



      componentDidMount(){
              
        this.socket.on('send changes', (texts) => {
          this.setState({
            text:texts.data
          })
        });
          this.socket.on('send users', (texts) => {
              console.log(39,"received users on editor "+texts)
              this.setState({
                  userList:texts
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
      this.socket.emit('save data', {"roomname":this.state.roomname,"data":this.state.text});
      e.preventDefault();
		  e.stopPropagation();
    }
    
    createuserlist=()=>{
        let table=[];
        console.log(79,this.state.userList)
            for (let i = 0; i < this.state.userList.length; i++) {
                let children = [];
                children.push(<li>{this.state.userList[i]}</li>);
                table.push(<ul>{children}</ul>);
            }

            return table;
    }
    render(){

      let text=this.state.text;
      let name = this.props.name;
      let room = this.props.room;
      console.log(74,name,room)
      
        return(
            <div>
            <form>
                <h1>Users:</h1>
                    {this.createuserlist()}
                <textarea rows="30" cols="100" onChange={this.changeText} value={text}/>
                <button onClick = {this.showHistory}>History</button>
                <button onClick = {this.saveData}>Save</button>
            </form>
            {this.state.showHistory ? <History data={this.state.history}/> : null}
            </div>
        )
    }

}

export default Editor;
