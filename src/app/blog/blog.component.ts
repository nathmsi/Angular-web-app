import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../models/message.model';
import { BlogService } from '../services/blog-message.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {


  messages: Message[];
  messagesSubscription: Subscription;
  dataReceive: boolean = false;
  username: string = "";
  
  @ViewChild('referenceMessage') referenceMessage: ElementRef;

  constructor(private blogService: BlogService) {
    this.username =  this.blogService.user.name;

  }

  ngOnInit() {
    this.messagesSubscription = this.blogService.blogSubject.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        messages.length > 0 && console.log("%c BLOG \n array object Message", "color:orange" , messages );
        this.dataReceive = true;
      }
    );
    this.blogService.emitMessages();
  }


  onSubmit(form: NgForm) {
    this.dataReceive = false;
    this.referenceMessage.nativeElement.value = '';
    this.blogService.createNewMessage(form.value['message']);
  }

  onKeydown(event, form: NgForm) {
  }




  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

}
