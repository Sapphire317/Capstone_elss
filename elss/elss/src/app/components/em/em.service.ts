import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';

import { createElection } from '../../org.elss.election';
import { deleteElection } from '../../org.elss.election';
import { changeElectionStatus } from '../../org.elss.election';
import { Election } from '../../org.elss.election';
import 'rxjs/Rx';

@Injectable()
export class EmService {

  private NS_CE = 'org.elss.election.createElection';
  private NS_DE = 'org.elss.election.deleteElection';
  private NS_Elec= 'org.elss.election.Election';
  private NS_CES= 'org.elss.election.changeElectionStatus';


  constructor(
    private dataService: DataService<createElection>,
    private dataService_Elec: DataService<Election>,
    private dataService_DE: DataService<deleteElection>,
    private dataService_CES: DataService<changeElectionStatus>,
    ) {
  };

  public getAll(): Observable<createElection[]> {
      return this.dataService.getAll(this.NS_CE );
  }

  public getElections(): Observable<Election[]> {
    return this.dataService_Elec.getAll(this.NS_Elec);
  }

  public getTransaction(id: any): Observable<createElection> {
    return this.dataService.getSingle(this.NS_CE , id);
  }

  public changeElecStatus(itemToAdd: any): Observable<changeElectionStatus> {
    return this.dataService_CES.add(this.NS_CES, itemToAdd);
  }

  public createElection(itemToAdd: any): Observable<createElection> {
    return this.dataService.add(this.NS_CE, itemToAdd);
  }

  public deleteElection(itemToAdd: any): Observable<deleteElection> {
    return this.dataService_DE.add(this.NS_DE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<createElection> {
    return this.dataService.update(this.NS_CE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<createElection> {
    return this.dataService.delete(this.NS_CE, id);
  }


}
