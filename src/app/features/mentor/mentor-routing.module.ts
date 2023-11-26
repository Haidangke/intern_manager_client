import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MentorListComponent, MentorDetailComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: MentorListComponent,
    },
    {
        path: ':id',
        component: MentorDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MentorRoutingModule {}
