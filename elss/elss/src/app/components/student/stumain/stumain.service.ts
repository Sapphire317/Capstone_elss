import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Election } from '../../../org.elss.election';

@Injectable()
export class StumainService {

  private NS_Elec= 'org.elss.election.Election';

  constructor(
    private dataService_Elec: DataService<Election>,
  ) { }

  public getElections(): Observable<Election[]> {
    return this.dataService_Elec.getAll(this.NS_Elec);
  }
  
  public getElection(id: any): Observable<Election> {
    return this.dataService_Elec.getSingle(this.NS_Elec, id);
  }
}

