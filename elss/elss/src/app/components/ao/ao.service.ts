import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { createStudent } from '../../org.elss.student';
import { deleteStudent } from '../../org.elss.student';
import { Student } from '../../org.elss.student';
import 'rxjs/Rx';

@Injectable()
export class AoService {

  private NS_CS = 'org.elss.student.createStudent';
  private NS_DS = 'org.elss.student.deleteStudent';
  private NS_Stu = 'org.elss.student.Student';

  constructor(
    private dataService: DataService<createStudent>,
    private dataServiec_Stu: DataService<Student>,
    private dataService_DS: DataService<deleteStudent>,) {
  };


  public getAll(): Observable<createStudent[]> {
      return this.dataService.getAll(this.NS_CS);
  }

  public getStudents(): Observable<Student[]> {
    return this.dataServiec_Stu.getAll(this.NS_Stu);
  }


  public getTransaction(id: any): Observable<createStudent> {
    return this.dataService.getSingle(this.NS_CS, id);
  }

  public createStudent(itemToAdd: any): Observable<createStudent> {
    return this.dataService.add(this.NS_CS, itemToAdd);
  }

  public deleteStudent(itemToAdd: any): Observable<deleteStudent> {
    return this.dataService_DS.add(this.NS_DS, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<createStudent> {
    return this.dataService.update(this.NS_CS, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<createStudent> {
    return this.dataService.delete(this.NS_CS, id);
  }

}
