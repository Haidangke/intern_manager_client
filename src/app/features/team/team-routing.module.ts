import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDetailComponent, TeamListComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: TeamListComponent,
    },
    {
        path: ':id',
        component: TeamDetailComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeamRoutingModule {}
