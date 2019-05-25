import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { VotingBox } from '../../../../org.elss.votingbox';
import { ballotCast } from '../../../../org.elss.votingbox';
import { addCasted } from '../../../../org.elss.election';
import 'rxjs/Rx';

import { Election } from '../../../../org.elss.election';

  
@Injectable()
export class BallotService {

  private NS_VB = 'org.elss.votingbox.VotingBox';
  private NS_BC = 'org.elss.votingbox.ballotCast';
  private NS_AC = 'org.elss.election.addCasted';
  private NS_E = 'org.elss.election.Election';

  constructor(
    private dataService_VB: DataService<VotingBox>,
    private dataService_BC: DataService<ballotCast>,
    private dataService_AC: DataService<addCasted>,
    private dataService_E: DataService<Election>
  ) { }

  public getVotingBoxes(): Observable<VotingBox[]> {
    return this.dataService_VB.getAll(this.NS_VB);
  }

  public BallotCast(itemToAdd: any): Observable<ballotCast> {
    return this.dataService_BC.add(this.NS_BC, itemToAdd);
  }

  public addCasted(itemToAdd: any): Observable<addCasted> {
    return this.dataService_AC.add(this.NS_AC, itemToAdd);
  }

  public getElection(id: any): Observable<Election> {
    return this.dataService_E.getSingle(this.NS_E, id);
  }
}
