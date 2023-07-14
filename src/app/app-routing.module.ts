import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';
import { AdminLayoutComponent } from '@core/layouts';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'login',
        loadChildren: () =>
            import('./features/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('./features/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'interns',
                loadChildren: () =>
                    import('./features/intern/intern.module').then(
                        (module) => module.StudentModule
                    ),
            },
            {
                path: 'teams',
                loadChildren: () =>
                    import('./features/team/team.module').then(
                        (m) => m.TeamModule
                    ),
            },
            {
                path: 'mentors',
                loadChildren: () =>
                    import('./features/mentor/mentor.module').then(
                        (m) => m.MentorModule
                    ),
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('./features/project/project.module').then(
                        (m) => m.ProjectModule
                    ),
            },
            {
                path: 'accounts',
                loadChildren: () =>
                    import('./features/account/account.module').then(
                        (m) => m.AccountModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
