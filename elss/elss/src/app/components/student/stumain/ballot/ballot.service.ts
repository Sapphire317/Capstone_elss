import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { VotingBox } from '../../../../org.elss.votingbox';
import { ballotCast } from '../../../../org.elss.votingbox';
import 'rxjs/Rx';

@Injectable()
export class BallotService {

  private NS_VB = 'org.elss.votingbox.VotingBox';
  private NS_BC = 'org.elss.votingbox.ballotCast';

  constructor(
    private dataService_VB: DataService<VotingBox>,
    private dataService_BC: DataService<ballotCast>
  ) { }

  public getVotingBoxes(): Observable<VotingBox[]> {
    return this.dataService_VB.getAll(this.NS_VB);
  }

  public BallotCast(itemToAdd: any): Observable<ballotCast> {
    return this.dataService_BC.add(this.NS_BC, itemToAdd);
  }
}
