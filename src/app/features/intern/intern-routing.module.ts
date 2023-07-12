import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StudentDetailComponent, InternListComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: InternListComponent,
    },
    {
        path: ':id',
        component: StudentDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
