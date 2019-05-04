import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { createVotingBox } from '../../../org.elss.votingbox';
import { deleteVotingBox } from '../../../org.elss.votingbox';
import { VotingBox } from '../../../org.elss.votingbox';
import 'rxjs/Rx';

@Injectable()
export class CandidateService {

  private NS_CVB = 'org.elss.votingbox.createVotingBox';
  private NS_DVB = 'org.elss.votingbox.DeleteVotingBox';
  private NS_VB = 'org.elss.votingbox.VotingBox';
  constructor(
    private dataService_CVB: DataService<createVotingBox>,
    private dataService_DVB: DataService<deleteVotingBox>,
    private dataService_VB: DataService<VotingBox>
    ) {
  }

  public getVotingBoxes(): Observable<VotingBox[]> {
    return this.dataService_VB.getAll(this.NS_VB);
  }

  public createVotingBox(itemToAdd: any): Observable<createVotingBox> {
    return this.dataService_CVB.add(this.NS_CVB, itemToAdd);
  }

  public deleteVotingBox(itemToAdd: any): Observable<deleteVotingBox> {
    return this.dataService_DVB.add(this.NS_DVB, itemToAdd);
  }

}
