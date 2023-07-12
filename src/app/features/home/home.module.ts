import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ChartsComponent } from './components/charts/charts.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { AuthGuard } from '@core/guards';
import { InternLatestComponent } from './components/intern-latest/intern-latest.component';

@NgModule({
    declarations: [HomeComponent, ChartsComponent, InternLatestComponent],
    imports: [
        CommonModule,
        SharedModule,
        ChartModule,
        TableModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent, canActivate: [AuthGuard] },
        ]),
    ],
})
export class HomeModule {}
