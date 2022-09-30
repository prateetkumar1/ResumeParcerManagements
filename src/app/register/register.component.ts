import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  registerModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPasssword: ''
  };

  showBar = false;
  buttonDisabled = false;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
  }

   /**
   * @description This will submit the data
   */
    onSubmit() {
      this.showBar = true;
      this.buttonDisabled = true;
      setTimeout(() => {
        if (this.registerModel.password !== this.registerModel.confirmPasssword) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password and confirm password does not match' });
          this.showBar = false;
          this.buttonDisabled = false;
        } else {
          this.showBar = false;
          this.buttonDisabled = false;
          this.storage.RegisteredUsers = this.registerModel;
          this.messageService.add({
            severity: 'success', summary: 'Success', detail: 'Dear ' + this.registerModel.firstName + ' ' + this.registerModel.lastName + 'you are successfully registered'
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      }, 2000);
  
    }

}
