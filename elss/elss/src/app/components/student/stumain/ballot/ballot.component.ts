
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BallotService } from './ballot.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.css'],
  providers: [BallotService]
})
export class BallotComponent implements OnInit {

  BCForm : FormGroup;

  private allAssets;
  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  private electionKey;


  boxId = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute, private serviceB: BallotService, fb: FormBuilder) {
    this.route.params.subscribe(params => {
      this.electionKey= params['electionKey'];
  });

  this.BCForm = fb.group({
    boxId: this.electionKey,
    transactionId: this.transactionId,
    timestamp: this.timestamp
  });

   }

  ngOnInit() {
    this.loadVotingBox();
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
    this.Transaction = {
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

    return this.serviceB.BallotCast(this.Transaction)
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

  setId(id){
    this.boxId = id;
    console.log(id);
  }
  

}



