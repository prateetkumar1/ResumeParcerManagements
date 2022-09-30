import { Component, OnInit } from '@angular/core';
import { ResumeStatusAdd } from 'src/app/interface/resume-status-add';
import { HttpsService } from 'src/app/service/https.service';
import { LoaderService } from 'src/app/service/loader.service';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-resume-status',
  templateUrl: './resume-status.component.html',
  styleUrls: ['./resume-status.component.scss'],
  // providers: [MessageService]
})
export class ResumeStatusComponent implements OnInit {

  resumeStatusAddModel: ResumeStatusAdd;

  constructor(
    private loader: LoaderService,
    private http: HttpsService
  ) {
    this.resumeStatusAddModel = {
      id: 0,
      statusName: '',
      statusCode: ''
    }
  }

  ngOnInit(): void {
  }

  /**
   * @description this will submit the data to API
   */
  onSubmit() {
    this.loader.show()
    console.log('this.resumeStatusAddModel', this.resumeStatusAddModel);
    this.http.post('ResumeStatusAdd', this.resumeStatusAddModel)
      .subscribe({
        complete: () => { },
        next: (res) => {
          this.loader.hide();
          window.alert(JSON.stringify(res));
        },
        error: (err) => { 
          this.loader.hide();
          window.alert(JSON.stringify(err));
        }
      });
  }

}
