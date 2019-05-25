import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastedstuService } from './castedstu.service';


@Component({
  selector: 'app-castedstu',
  templateUrl: './castedstu.component.html',
  styleUrls: ['./castedstu.component.css'],
  providers: [CastedstuService]
})
export class CastedstuComponent implements OnInit {

  electionKey:String;

  castedList;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  constructor(private route: ActivatedRoute, public serviceCS: CastedstuService) { 

    this.route.params.subscribe(params => {
      this.electionKey= params['electionKey'];
  });
  }

  loadElection(): Promise<any> {
    const tempList = [];
    return this.serviceCS.getElection(this.electionKey)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
 
      this.castedList=result['casted'];
      console.log(this.castedList);
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

  ngOnInit() {
    this.loadElection();
    console.log(this.castedList);
  }

}
