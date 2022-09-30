import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * @desciription this will get the token and return
   * @returns tokrn
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * @description this will check if the token is present or no
   * @returns token is present
   */
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
}
