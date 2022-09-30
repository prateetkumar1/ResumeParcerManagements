import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  RegisteredUsers = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPasssword: ''
  }

  currentResume = {};

  constructor() { }
}
