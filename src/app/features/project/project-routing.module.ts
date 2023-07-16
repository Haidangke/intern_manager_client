import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectDetailComponent, ProjectListComponent } from './pages';

const routes: Routes = [
    { path: '', component: ProjectListComponent },
    { path: ':id', component: ProjectDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProjectRoutingModules {}
