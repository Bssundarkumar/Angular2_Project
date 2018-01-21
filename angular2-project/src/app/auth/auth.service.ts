import * as firebase from 'firebase';
import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable() 
export class AuthService{
tk:string;
constructor(private router:Router){

}

    signupUser(email:string,password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password).catch(
            error=>console.log(error)
        );
    }

    signinUser(email:string,password:string){
        this.router.navigate(['/']);
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(
            response=>{
                firebase.auth().currentUser.getToken()
                .then(
                    (token:string)=>{
                        this.tk=token;
                    }
                )
            }
        )
        .catch(
            error=>console.log(error)
        );
    }

    getToken(){
        firebase.auth().currentUser.getToken()
        .then(
            (token:string)=>this.tk=token
        );

        return this.tk;
    }

    isAuthnticate(){
      return this.tk!=null;
    }

    logOut(){
        firebase.auth().signOut();
        this.tk=null;
    }
}