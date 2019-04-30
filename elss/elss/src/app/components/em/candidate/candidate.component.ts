import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from './candidate.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css'],
  providers: [CandidateService]
})
export class CandidateComponent implements OnInit {


  myForm: FormGroup;

  private allAssets;
  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  electionKey = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);

  constructor(private route: ActivatedRoute, private serviceCD: CandidateService, fb: FormBuilder) {
    this.myForm = fb.group({
      electionKey: this.electionKey,
      name: this.name,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });

    this.route.params.subscribe(params => {
      this.serviceStuList.getStudentsBySchool(this.url, params['school']).subscribe(
        data => {
          this.studentList = data;
          console.log(this.studentList);
        }
      )
   });
  }

  ngOnInit() {
    this.loadVotingBox();
  }

  loadVotingBox(): Promise<any> {
    const tempList = [];
    return this.serviceCD.getVotingBoxes()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      console.log(this.allAssets);
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

  createVotingBox(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.elss.votingbox.createVotingBox',
      'electionKey': this.electionKey.value,
      'name': this.name.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'electionKey': null,
      'name': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceCD.createVotingBox(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'electionKey': null,
        'name': null,
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

  resetForm(): void {
    this.myForm.setValue({
      'electionKey': null,
      'name': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
