import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StuListService } from './stu-list.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-stu-list',
  templateUrl: './stu-list.component.html',
  styleUrls: ['./stu-list.component.css'],
  providers: [StuListService]
})
export class StuListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private serviceStuList: StuListService, fb: FormBuilder) {
    this.SAForm = fb.group({
      studentId: this.studentId,
      attendance: this.attendance,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
   }

  SAForm: FormGroup;

  private studentList;
  private currentId;
  private sub: any;
  url: string;


  private allTransactions;
  private Transaction;
  private errorMessage;

  studentId = new FormControl('', Validators.required);
  attendance:string;
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  ngOnInit() {
    this.url = "http://localhost:3000/api/queries/StudentBySchool?school=";
    this.route.params.subscribe(params => {
      this.serviceStuList.getStudentsBySchool(this.url, params['school']).subscribe(
        data => {
          this.studentList = data;
          console.log(this.studentList);
        }
      )
   });
  }

  setAttendance(id, atd): Promise<any> {
    this.currentId = id;
    this.attendance = atd;
    
    this.Transaction = {
      $class: 'org.elss.student.setAttendance',
      'studentId': this.currentId,
      'attendance': this.attendance,
      'transactionId': null,
      'timestamp': null
    };

    this.SAForm.setValue({
      'studentId': null,
      'attendance': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceStuList.setAttendance(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.SAForm.setValue({
        'studentId': null,
        'attendance': null,
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


  setId(id: any, atd: string): void {
    
  }

}
