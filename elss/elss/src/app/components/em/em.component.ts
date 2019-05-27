import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmService } from './em.service';
import 'rxjs/add/operator/toPromise';
import {IMyDpOptions} from 'angular4-datepicker/src/my-date-picker/interfaces';
@Component({
  selector: 'app-em',
  templateUrl: './em.component.html',
  styleUrls: ['./em.component.css'],
  providers:[EmService]
})
export class EmComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
};

// Initialized to specific date (09.10.2018).
public model: any = { date: { year: 2018, month: 10, day: 9 } };


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


  constructor(private serviceEM: EmService, fb: FormBuilder) {
    this.myForm = fb.group({
      school: this.school,
      name: this.name,
      electionDate: this.electionDate,
      quorumRate: this.quorumRate,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });

    this.deleteForm = fb.group({
      electionKey: this.currentId,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });

    this.CESForm = fb.group({
      electionKey: this.currentId,
      status: this.status,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  test(){
    console.log(this.electionDate.value.formatted);
  }
  ngOnInit(): void {
    this.loadElections();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceEM.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
      alert(error);
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  loadElections(): Promise<any> {
    const tempList = [];
    return this.serviceEM.getElections()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      alert(error);
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  createElection(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.elss.election.createElection',
      'school': this.school.value,
      'name': this.name.value,
      'electionDate': this.electionDate.value.formatted,
      'quorumRate': this.quorumRate.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'school': null,
      'name': null,
      'electionDate': null,
      'quorumRate': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceEM.createElection(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'school': null,
        'name': null,
        'electionDate': null,
        'quorumRate': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      alert(error);
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  deleteElection(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.elss.election.deleteElection',
      'electionKey': this.currentId,
      'transactionId': null,
      'timestamp': null
    };

    this.deleteForm.setValue({
      'electionKey': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceEM.deleteElection(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.deleteForm.setValue({
        'electionKey': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      alert(error);
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  changeElecStatus(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.elss.election.changeElectionStatus',
      'electionKey': this.currentId,
      'status': this.status.value,
      'transactionId': null,
      'timestamp': null
    };

    this.CESForm.setValue({
      'electionKey': null,
      'status': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceEM.changeElecStatus(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.CESForm.setValue({
        'electionKey': null,
        'status': null,
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

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.elss.election.createElection',
      'school': this.school.value,
      'name': this.name.value,
      'electionDate': this.electionDate.value,
      'quorumRate': this.quorumRate.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceEM.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceEM.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceEM.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'school': null,
        'name': null,
        'electionDate': null,
        'quorumRate': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.school) {
        formObject.school = result.school;
      } else {
        formObject.school = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.electionDate) {
        formObject.electionDate = result.electionDate;
      } else {
        formObject.electionDate = null;
      }

      if (result.quorumRate) {
        formObject.quorumRate = result.quorumRate;
      } else {
        formObject.quorumRate = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      this.myForm.setValue(formObject);

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

  resetForm(): void {
    this.myForm.setValue({
      'school': null,
      'name': null,
      'electionDate': null,
      'quorumRate': null,
      'transactionId': null,
      'timestamp': null
    });
  }

}
