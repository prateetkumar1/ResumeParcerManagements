import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  /**
   * @description this will map the key to the array value and return the object
   * @param key ID
   * @param myArray ARRAY
   * @returns OBJECT
   */
  searchById(key: number, myArray: any[]) {
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].id === key) {
        return myArray[i];
      }
    }
  }
}
