import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { DataService } from '../../data.service';
import { setAttendance } from '../../org.elss.student';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StuListService {


  private NS_SA = 'org.elss.student.setAttendance';

  constructor(private http:HttpClient,
    private dataService_SA: DataService<setAttendance>) { }

  getStudentsBySchool(url, school) {
    let queryUrl = url + school;
    return this.http.get(queryUrl);
  }

  public setAttendance(itemToAdd: any): Observable<setAttendance> {
    return this.dataService_SA.add(this.NS_SA, itemToAdd);
  }
}





