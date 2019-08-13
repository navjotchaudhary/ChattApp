import React, { Component } from 'react';

import MessageList from './components/MessageList.js'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList.js'
import NewRoomForm from './components/NewRoomForm.js'
import Chatkit from '@pusher/chatkit-client'
import './App.css';
import {tokenUrl,instanceLocator} from "./config";
class App extends Component {

  

  constructor()
  {
    super();
    this.state = {
      messages:[],
      joinableRooms:[],
      joinedRooms:[],
      roomId:null,
      username:"navdeep",
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.createRoom = this.createRoom.bind(this)

  }


//roomid



  componentDidMount(){
      const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId:this.state.username,
        tokenProvider: new Chatkit.TokenProvider({
          url: tokenUrl
      })
      })
      chatManager.connect()
        
        .then(currentUser => {
          this.currentUser = currentUser
          this.getRooms();
        })
      }
          /////////////////////////////////////////////////////////////
getRooms(){
          this.currentUser.getJoinableRooms()
          .then(joinableRooms => {

              console.log(joinableRooms)
              console.log(this.currentUser)
            this.setState({
   ////////////////////////////////////////////////////////////////////////////////// 
              //joinableRooms:[...this.state.joinableRooms,joinableRooms],
             joinableRooms:[...joinableRooms],
/////////////////////////////////////////////////////////////////////////////////////////
///////                THE PROBLEM IS RIGHT ABOVE                                 ///////
/////////////////////////////////////////////////////////////////////////////////////////          
            joinedRooms:this.currentUser.rooms
            })
          })
          .catch(err => console.log('error'))
          console.log(this.state.joinedRooms)
        
          

// nitin

            
            
        
      

        } 

  subscribeToRoom(id){
    this.setState({
      messages:[],
    })
    this.currentUser.subscribeToRoomMultipart({
      roomId: id,
      hooks: {
          onMessage: message => {
              
              this.setState({
                //messages:[...this.state.messages, message.parts[0].payload.content]
                messages:[...this.state.messages, message]
                
              })
              
          }
      }
  })
  .then(room => {
    this.setState({
        roomId: room.id
    })
    this.getRooms()
})
.catch(err => console.log('error on subscribing to room: ', err))

  }

  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId:this.state.roomId
    })
  }



  createRoom(roomname){
    console.log(roomname)
    this.currentUser.createRoom({
      
      name:roomname
  })
  .then(room => this.subscribeToRoom(room.id))
  .catch(err => console.log('error with createRoom: ', err))
}

  


  render() {
    //console.log(this.state.joinedRooms)
    
    return (
      <div className="app">
        
         
        <MessageList messages={this.state.messages} user={this.state.username}/>
        <SendMessageForm sendMessage={this.sendMessage}/>
        <RoomList rooms={[...this.state.joinableRooms , ...this.state.joinedRooms]} subscribeToRoom = {this.subscribeToRoom} roomId={this.state.roomId}/>
        <NewRoomForm create_room = {this.createRoom}/>
        
      </div>
      
    );
    

  }
}

export default App;
//ID

/////////////////////////////////////////////////////
//         this is from:                           //
//            __________yuutube_____               //
//             watch 58:00                         //
//                                                 //
//////////////////////////////////////////////////////
