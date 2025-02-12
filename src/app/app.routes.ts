import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnalysisComponent } from './analysis/analysis.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent },
    { path: 'analysis', component: AnalysisComponent },
];
