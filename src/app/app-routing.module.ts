import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';
import { AdminGuard } from '@core/guards/admin.guard';
import { AdminLayoutComponent } from '@core/layouts';
import { NotFoundPageComponent } from '@shared/components/not-found-page/not-found-page.component';

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
                canActivate: [AdminGuard],
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
                canActivate: [AdminGuard],
            },
            {
                path: 'mentors',
                loadChildren: () =>
                    import('./features/mentor/mentor.module').then(
                        (m) => m.MentorModule
                    ),
                canActivate: [AdminGuard],
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('./features/project/project.module').then(
                        (m) => m.ProjectModule
                    ),
                canActivate: [AdminGuard],
            },
            {
                path: 'accounts',
                loadChildren: () =>
                    import('./features/account/account.module').then(
                        (m) => m.AccountModule
                    ),
                canActivate: [AdminGuard],
            },

            {
                path: '**',
                pathMatch: 'prefix',
                redirectTo: '404',
            },
        ],
    },
    {
        path: '404',
        component: NotFoundPageComponent,
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
