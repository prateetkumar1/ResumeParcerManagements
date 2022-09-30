import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeAddComponent } from './resume-add/resume-add.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { ResumeStatusComponent } from './resume-status/resume-status.component';
import { ResumeViewComponent } from './resume-view/resume-view.component';

const routes: Routes = [
  { path: 'resume-builder', component: ResumeBuilderComponent },
  { path: 'resume-list', component: ResumeListComponent },
  { path: 'resume-view', component: ResumeViewComponent },
  { path: 'resume-add', component: ResumeAddComponent },
  { path: 'resume-status-add', component: ResumeStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumeRoutingModule { }
