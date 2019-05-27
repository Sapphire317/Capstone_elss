
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from "angular4-social-login";
import { BallotService } from './ballot.service';
import 'rxjs/add/operator/toPromise';
import { addCasted } from 'app/org.elss.election';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css'],
  providers: [BallotService]
})
export class BallotComponent implements OnInit {

  private user: SocialUser;
  public loggedIn: boolean;

  BCForm : FormGroup;
  ACForm : FormGroup;

  private allAssets;
  private allTransactions;

  private ACTransaction;
  private BCTransaction;

  private currentId;
  private errorMessage;

  private electionKey;
  private castedList;
  private isNew;
  stuId:String ;

  boxId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  ACtransactionId = new FormControl('', Validators.required);
  BCtransactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute, private serviceB: BallotService, fb: FormBuilder, private authService: AuthService) {
    this.route.params.subscribe(params => {
      this.electionKey= params['electionKey'];
  });

  this.BCForm = fb.group({
    boxId: this.electionKey,
    transactionId: null,
    timestamp: null
  });

  this.ACForm = fb.group({
    electionKey: null,
    studentId: null,
    transactionId: null,
    timestamp: null
  });
   }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    if(this.loggedIn){
      console.log(this.user.email.substring(0,8));
      this.stuId = this.user.email.substring(0,8);
    }

    this.loadVotingBox();
    this.loadElection();
  }


  loadVotingBox(): Promise<any> {
    const tempList = [];
    return this.serviceB.getVotingBoxes()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      
      this.allAssets = tempList;
      console.log(this.allAssets);
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

  ballotCast(): Promise<any> {
    this.BCTransaction = {
      $class: 'org.elss.votingbox.ballotCast',
      'boxId': this.boxId,
      'transactionId': null,
      'timestamp': null
    };

    this.BCForm.setValue({
      'boxId': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceB.BallotCast(this.BCTransaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.BCForm.setValue({
        'boxId': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  loadElection(): Promise<any> {
    const tempList = [];
    return this.serviceB.getElection(this.electionKey)
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

  addCasted(): Promise<any> {
    this.ACTransaction = {
      $class: 'org.elss.election.addCasted',
      'electionKey': this.electionKey,
      'studentId': this.stuId,
      'transactionId': null,
      'timestamp': null
    };

    this.ACForm.setValue({
      'electionKey': null,
      'studentId': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceB.addCasted(this.ACTransaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.BCForm.setValue({
        'electionKey': null,
        'studentId': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    })
    ;
  }

  setId(id){
    this.boxId = id;
    console.log(id);
  }
  

}



