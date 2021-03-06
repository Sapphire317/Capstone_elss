import { Component, OnInit } from '@angular/core';

import { AuthService } from 'angular4-social-login';
import {  GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-emlogin',
  templateUrl: './emlogin.component.html',
  styleUrls: ['./emlogin.component.css']
})
export class EmloginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(()=>{

      if(this.loggedIn){
        this.router.navigate(['/EM']);
      }else{
        alert('Login failed');
      }

    }
      
    );
  }

  signOut(): void {
    this.authService.signOut();
  }

}

