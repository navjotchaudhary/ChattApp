import React, {Component} from 'react';


export default class RoomList extends Component{
        render(){
        const orderedRooms = [...this.props.rooms].sort((a,b) => a.id - b.id)

        return(
            <div className="rooms-list">
                <ul> 
                    {orderedRooms.map(room => {
                   

                const active = this.props.roomId === room.id ? "active" : "";

                        return(
                        <li key={room.id} className={"room " + active}>
                            <a 
                            onClick={() => this.props.subscribeToRoom(room.id)}
                            href="#"
                            >{room.name}</a>    
                        </li>
                        )
                        
                    })}
                </ul>
            </div>
        )
    }
}