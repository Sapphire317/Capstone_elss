import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from "angular4-social-login";
import { StumainService} from './stumain.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-stumain',
  templateUrl: './stumain.component.html',
  styleUrls: ['./stumain.component.css'],
  providers:[StumainService]
})
export class StumainComponent implements OnInit {

  private user: SocialUser;
  public loggedIn: boolean;

  private allAssets;
  
  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  private castedList;
  private isNew;
  private stuId;

  private electionKey;

  constructor(private serviceSM: StumainService, fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadElections();

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    if(this.loggedIn){
      console.log(this.user.email.substring(0,8));
      this.stuId = this.user.email.substring(0,8);
    }
  }

  loadElections(): Promise<any> {
    const tempList = [];
    return this.serviceSM.getElections()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  loadElection(): Promise<any> {
    const tempList = [];
    return this.serviceSM.getElection(this.electionKey)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
 
      this.castedList=result['casted'];
      console.log(this.castedList);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setKey(key){
    this.electionKey = key;
    this.loadElection().then(()=>{

      if(this.checkNew(this.stuId)){
        this.router.navigate(['/Ballot', this.electionKey]);
      }else{
        alert('You already casted');
      }

    });
  

    
  }

  checkNew(stuId) : boolean{
    for(let id of this.castedList){
      console.log(id, stuId);
      if(id === stuId)
        return false;
    }
    return true;
  }

  signOut(): void {
    this.authService.signOut().then(()=> {
      this.router.navigate(['/stu_login']);
    });
  }
}




