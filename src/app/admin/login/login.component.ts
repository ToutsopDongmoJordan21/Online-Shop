import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';


// Initialize Firebase

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  showErrorMessage=false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
login(){
    this.showErrorMessage=false;
  const firebaseApp = firebase.initializeApp(environment.firebaseConfig);
  const auth = firebase.auth();
  auth.signInWithEmailAndPassword( this.loginForm.get('username')!.value,  this.loginForm!.get('password')!.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      this.router.navigateByUrl('admin/product');
      // ...
    })
    .catch((error) => {
      this.showErrorMessage = true;
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}
}
