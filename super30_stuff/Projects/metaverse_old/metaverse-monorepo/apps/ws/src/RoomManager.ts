import { OutgoingMessage } from "./types";
import { User } from "./User";



export class RoomManager {

  rooms: Map<string, User[]> = new Map();
  static instance: RoomManager | undefined;

  private constructor(){
    this.rooms = new Map();
  }

  static getInstance(){
    if(!this.instance){
      this.instance = new RoomManager()
    }
    return this.instance;
  }

  removeUser(spaceId: string, user:User){
    const userArr = this.rooms.get(spaceId);
    if(!userArr){
      return;
    }

    const newUserArr = userArr.filter((u) => (u.id !== user.id));

    if(this.rooms.has(spaceId)){
      this.rooms.set(spaceId, newUserArr);
      return;
    }
    return;
  }

  addUser(spaceId: string, user: User) {
    if(this.rooms.has(spaceId)){
      this.rooms.set(spaceId, [...(this.rooms.get(spaceId) ?? []), user]);
      return;
    }
    this.rooms.set(spaceId, [user]);
  }

  broadcast(data: OutgoingMessage, user: User, spaceId: string){

    const userList = this.rooms.get(spaceId);
    if(!userList){
      return;
    }

    userList.forEach((u) => {
      if(u.id !== user.id){
        u.send(data);
      }
    })

  }
}






