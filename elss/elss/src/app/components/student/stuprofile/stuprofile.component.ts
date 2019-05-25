import { Component, OnInit } from '@angular/core';
import { StuloginService} from '../stulogin/stulogin.service';

@Component({
  selector: 'app-stuprofile',
  templateUrl: './stuprofile.component.html',
  styleUrls: ['./stuprofile.component.css']
})
export class StuprofileComponent implements OnInit {

  constructor(public auth: StuloginService) { }

  ngOnInit() {
  }

}
