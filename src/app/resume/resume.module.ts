import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeAddComponent } from './resume-add/resume-add.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeStatusComponent } from './resume-status/resume-status.component';
import { ResumeViewComponent } from './resume-view/resume-view.component';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    ResumeAddComponent,
    ResumeBuilderComponent,
    ResumeListComponent,
    ResumeStatusComponent,
    ResumeViewComponent
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    ToastModule,
    PanelModule,
    FormsModule,
    ButtonModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    TableModule,
    DialogModule
  ]
})
export class ResumeModule { }
