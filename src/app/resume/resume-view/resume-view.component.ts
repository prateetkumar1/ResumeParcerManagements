import { Component, OnInit } from '@angular/core';
import { Details, Resume } from 'src/app/models/resume';

@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss']
})
export class ResumeViewComponent implements OnInit {

  np: string;
  resumeModel = new Resume(0, new Details('', '', '', 0, [], [], [], [], '', ''));
  
  constructor() {
    this.np = 'Not Provided';
  }

  ngOnInit(): void {
  }

  print() {
    window.print();
  }

}
