import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ResumeApplication } from 'src/app/interface/resume-application';
import { HttpsService } from 'src/app/service/https.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-resume-add',
  templateUrl: './resume-add.component.html',
  styleUrls: ['./resume-add.component.scss'],
  providers: [MessageService]
})
export class ResumeAddComponent implements OnInit {

  resumeAddModel: ResumeApplication;
  uploadedFiles = [];

  constructor(
    private http: HttpsService,
    private loader: LoaderService,
    private messageService: MessageService,
  ) {
    this.resumeAddModel = {
      id: 0,
      candidateName: '',
      mobileNumber: '',
      emailID: ''
    }
  }

  ngOnInit(): void {
  }

  /**
   * @description this will submit the data to API
   */
  onSubmit() {
    if (this.uploadedFiles.length === 0) {
      window.alert('Kindly upload the file');
      return;
    }

    const model = {
      // resumes: formData,
      candidateName: this.resumeAddModel.candidateName,
      MobileNumber: this.resumeAddModel.mobileNumber,
      EmailID: this.resumeAddModel.emailID
    }
    console.log('formData', model);
    this.loader.show();
    this.http.post('CandidateDetailsSave', model)
      .subscribe({
        complete: () => { },
        next: (res) => {
          this.loader.hide();
          if (res.message === 'success' && res.statusCode === 200) {
            this.saveCandidateResume(res.memberList.id);
          }
        },
        error: (err) => {
          this.loader.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(err.error) });
          console.log(err);
          // window.alert(JSON.stringify(err));
        }
      });

    console.log('this.resumeAddModel', this.resumeAddModel, 'this.uploadedFiles', this.uploadedFiles);
  }

  saveCandidateResume(res: string) {
    let fileToUpload = <File>this.uploadedFiles[0];
    const formData = new FormData();
    formData.append(res, fileToUpload, fileToUpload.name);
    this.loader.show();
    this.http.post('ResumeSave', formData)
      .subscribe({
        complete: () => { },
        next: (res) => {
          this.loader.hide();
          console.log(res);
          if (res.message === 'success' && res.statusCode === 200) {
            // window.alert('The file path is ' + JSON.stringify(res.dbPath));
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Resume is successfully uploaded' });
          }
        },
        error: (err) => {
          this.loader.hide();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: JSON.stringify(err.error) });
          console.log(err);
          // window.alert(JSON.stringify(err));
        }
      });
  }

  /**
   * @description this will upload the file
   * @param event event from HTML
   */
  onUpload(event: any) {
    // console.log('EVENT', event.currentFiles);
    this.uploadedFiles = event.currentFiles;
    console.log(this.uploadedFiles[0], '1');
  }

}
