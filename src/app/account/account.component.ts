import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  user: User = {
    name: 'default',
    email: '',
    uid: "",
    isAuth: false,
    photo: "",
    phone: ""
  };
  userSubscription: Subscription;
  fileDetected: File = null;


  constructor(private authService: AuthService , private toastr: ToastrService ) { 
    this.userSubscription = this.authService.userSubject.subscribe(
      (user: User) => {
        console.log("%c Account component ","color: orange",user);
        this.user = user;
      }
    );
    this.authService.emitUser();
  }

  ngOnInit(): void {
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.authService.uploadFile(file).then(
      (url: string) => {
        this.user.photo !== "" && this.authService.deleteLastPhoto(this.user.photo)
        this.authService.savePhotoToUser(url);
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        this.toastr.success('File upload success !');
      },
      (error) =>{
        this.toastr.error('error uploadFile', error);
      }
    );
  }

  detectFiles(event) {
    this.fileDetected = event.target.files[0]
  }

  saveImage(){
    this.fileDetected !== null && this.onUploadFile(this.fileDetected);
  }

  onSubmit(form: NgForm) {
    this.authService.saveUser(form.value['username'],"").then(
      () =>{
        this.toastr.success('user saved success !');
      },
      (error) =>{
        this.toastr.error('error saved user ', error);
      }
    )
  }

}
