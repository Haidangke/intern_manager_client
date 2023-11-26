import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { StudentDetailComponent, InternListComponent } from './pages';
import { AdminGuard } from '@core/guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        component: InternListComponent,
        canActivate: [AdminGuard],
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
