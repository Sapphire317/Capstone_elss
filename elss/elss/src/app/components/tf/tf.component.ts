import { Component, OnInit, Input } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TfService } from './tf.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-tf',
  templateUrl: './tf.component.html',
  styleUrls: ['./tf.component.css'],
  providers:[TfService]
})
export class TfComponent implements OnInit {

  myForm: FormGroup;
  deleteForm: FormGroup;
  CESForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  //Get Elections
  private allAssets;

  //Status change
  status = new FormControl('', Validators.required);

  school = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  electionDate = new FormControl('', Validators.required);
  quorumRate = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);
  constructor(private serviceTf: TfService, fb: FormBuilder) { }

  ngOnInit() {
    this.loadElections();
  }


  loadElections(): Promise<any> {
    const tempList = [];
    return this.serviceTf.getElections()
    .toPromise()
    .then((result) => {
       console.log(result);
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

}
