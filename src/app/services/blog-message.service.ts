import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from '../models/message.model';

import * as firebase from 'firebase/app';

import 'firebase/auth';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models/user.model';





@Injectable()
export class BlogService {

  messages: Message[] = [];
  blogSubject = new Subject<Message[]>();
  user: User = {
    name: 'default',
    email: '',
    uid: "",
    isAuth: false,
    photo: "",
    phone: ""
  };
  userSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        this.user = user;
      }
    );
    this.authService.emitUser();
  }
  

  emitMessages() {
    this.blogSubject.next(this.messages);
  }

  saveMessages() {
    firebase.database().ref('/messages').set(this.messages);
  }

  getMessages() {
    console.log("%c getMessages()  ", "color:yellow" );
    firebase.database().ref('/messages').limitToLast(10)
      .on('value', (data) => {
        const messageArray = data.val() ?  Object.keys(data.val()).map(i => data.val()[i]) : [];
        this.messages = messageArray ;   
        this.emitMessages();
      }
      );
  }


  createNewMessage(message: string) {
    // this.messages.push({
    //   content: message,
    //   name: this.user.name,
    // });
    firebase.database().ref('/messages').push({
      content: message,
      name: this.user.name,
    }).then(()=>{
      console.log("%c createNewMessage => ", "color:yellow" , message);
    })
   
    //this.saveMessages();
    this.emitMessages();
  }





}