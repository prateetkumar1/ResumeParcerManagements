import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {

  constructor(
    public messageService: MessageService
  ) { }

  /**
   * @description This will show success message
   * @param summary 
   * @param details 
   */
  showSuccess(summary: string, details: string) {
    this.messageService.add({ severity: 'success', summary: summary, detail: details });
  }

  /**
   * @description This will show info message
   * @param summary 
   * @param details 
   */
  showInfo(summary: string, details: string) {
    this.messageService.add({ severity: 'info', summary: summary, detail: details });
  }

  /**
   * @description This will show warning message
   * @param summary 
   * @param details 
   */
  showWarn(summary: string, details: string) {
    this.messageService.add({ severity: 'warn', summary: summary, detail: details });
  }

  /**
   * @description This will show error message
   * @param summary 
   * @param details 
   */
  showError(summary: string, details: string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: details });
  }

  /**
   * @description This will clear the messages
   */
  clear() {
    this.messageService.clear();
  }

}
