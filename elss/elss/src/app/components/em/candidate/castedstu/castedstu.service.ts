import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Election } from '../../../../org.elss.election';
import 'rxjs/Rx';

@Injectable()
export class CastedstuService {

  private NS_E = 'org.elss.election.Election';

  constructor(private dataService: DataService<Election>) { }

  public getElection(id: any): Observable<Election> {
    return this.dataService.getSingle(this.NS_E, id);
  }
}
