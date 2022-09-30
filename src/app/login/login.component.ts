import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/service/loader.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginModel = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private storage: StorageService,
    private messageService: MessageService,
    private loader: LoaderService
  ) { }

  ngOnInit(): void {
  }

  /**
   * @description This will submit the data
   */
   onSubmit() {
    this.loader.show();
    if (this.loginModel.username === this.storage.RegisteredUsers.email && this.loginModel.password === this.storage.RegisteredUsers.password) {
      setTimeout(() => {
        this.router.navigate(['/resume/resume-list']);
        this.loader.hide();
      }, 2000);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username and Password does not match' });
      this.loader.hide();
    }
  }

}
