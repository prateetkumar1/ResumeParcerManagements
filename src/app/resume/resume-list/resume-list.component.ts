import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeList } from 'src/app/interface/resume-list';
import { Resume } from 'src/app/models/resume';
import { ExportService } from 'src/app/service/export.service';
import { HelperService } from 'src/app/service/helper.service';
import { HttpsService } from 'src/app/service/https.service';
import { LoaderService } from 'src/app/service/loader.service';
import { StorageService } from 'src/app/service/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})

export class ResumeListComponent implements OnInit {

  np = 'No value';
  resumes: Resume[];
  displayBasic: boolean = false;
  modalData = [];
  resumeStatusList: ResumeList[];
  selectedResumeStatusList!: ResumeList;

  constructor(
    private exportService: ExportService,
    private storage: StorageService,
    private router: Router,
    private http: HttpsService,
    private loader: LoaderService,
    private helper: HelperService
  ) {
    this.resumes = [];
    this.resumeStatusList = [];
  }

  ngOnInit(): void {
    this.getResumeStatus();
    this.getResumeList();
  }


  /**
   * @description this will get all the resumes from the API
   */
  getResumeList() {
    this.loader.show();
    this.http.get('parse')
      .subscribe({
        complete: () => { },
        next: (res) => {
          this.loader.hide();
          this.resumes = res;
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            this.resumes[index].details.workExperience = this.convertArraytoString(element.details.workExperience);
          }
          // console.log(this.resumes);
        },
        error: (err) => {
          this.loader.hide();
          console.log(err);
        }
      });
  }

  /**
   * @description this will get all the resume status from the DB
   */
  getResumeStatus() {
    this.loader.show();
    this.http.get('ResumeStatus')
      .subscribe({
        complete: () => { },
        next: (res) => {
          this.loader.hide();
          if (res.message === 'success' && res.statusCode === 200) {
            this.resumeStatusList = res.memberList;
            // console.log(this.resumeStatusList);
          }
        },
        error: (err) => {
          this.loader.hide();
          console.log(err);
        }
      });
  }

  onStatusChange(resumeData: any) {
    const model = {
      id: 0,
      candidateDetail: {
        id: resumeData.details.id
      },
      resumeStatus: this.helper.searchById(Number(resumeData.details.resumeStatus.id), this.resumeStatusList)
      // {
      //   id: Number(resumeData.details.resumeStatus.id)
      // }
    }
    if (confirm("Are you sure you want to change the status to " + model.resumeStatus.statusName)) {
      console.log('resumeData', model);
      this.loader.show();
      this.http.post('CandidateResumeTrackerAdd', model)
        .subscribe({
          complete: () => { },
          next: (res) => {
            this.loader.hide();
            if (res.message === 'success' && res.statusCode === 200) {
              this.getResumeList();
              window.alert("Status changes successfully to " + res.memberList.resumeStatus.statusName);
            }
          },
          error: (err) => {
            this.loader.hide();
            window.alert(err.error);
            console.log(err);
          }
        });
    }

  }

  /**
   * @description this will send the curent resume to service to download in excel
   * @param data the resume
   */
  exportToExcel(data: Resume) {
    this.exportService.exportAsExcelFile(this.resumes, 'resume');
  }

  /**
   * @description this will send the curent resume to service to download in pdf
   * @param data the resume
   */
  exportToPDF(data: Resume) {
    this.exportService.exportAsPDFFile('Hello', 'resume');
  }

  /**
   * @description This will send the resume to view
   * @param resume 
   */
  viewResume(resume: Resume) {
    this.storage.currentResume = resume;
    this.router.navigate(['/primeng/resume-view/'])
  }

  /**
   * @description this will reduce the number of string to be displayed
   * @param data 
   * @returns substring currently 20
   */
  displayMinimumLetters(data: any) {
    var arrays = data.toString();
    return arrays.substring(0, 30);
  }

  /**
   * @discription this wil show the dialog box
   * @param data 
   */
  showBasicDialog(data: any) {
    this.displayBasic = true;
    let a = data.split(',');
    this.modalData = a;
  }

  /**
   * @description This will convert array to string
   * @param data 
   * @returns string
   */
  convertArraytoString(data: any) {
    return data.toString();
  }

  /**
   * @description This will download the files to users machine
   * @param resume 
   */
  downloadFiles(resume: Resume) {
    let resumePath = resume.details.fileLocation.split('\\');
    const path = resumePath[resumePath.length - 1];
    const fileType = path.split('.');
    window.open(environment.apiUrl + 'ResumeSend/' + resumePath[resumePath.length - 1] + '/' + fileType[fileType.length - 1], "_blank");
  }

  /**
   * @description this will get the leave code as per the status
   * @param data 
   */
  getLeaveCode(data: number) {
    // console.log(data);
    switch (data) {
      case 4:
        return 'green';
      case 5:
        return 'red';
      case 6:
        return 'green';
      case 7:
        return 'green';
      case 8:
        return 'green';
      case 9:
        return 'green';
      case 10:
        return 'red';

      default:
        return 'green';
    }
  }

}
