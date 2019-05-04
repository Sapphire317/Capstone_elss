import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StumainService} from './stumain.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-stumain',
  templateUrl: './stumain.component.html',
  styleUrls: ['./stumain.component.css'],
  providers:[StumainService]
})
export class StumainComponent implements OnInit {

  private allAssets;
  
  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  constructor(private serviceSM: StumainService, fb: FormBuilder) { }

  ngOnInit() {
    this.loadElections();
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
}




