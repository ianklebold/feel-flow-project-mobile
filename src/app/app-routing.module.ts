import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsComponent,
    children:[
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then( m => m.CalendarPageModule)
      },
      {
        path: 'teams',
        loadChildren: () => import('./pages/teams/teams.module').then( m => m.TeamsPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'surveys',
    loadChildren: () => import('./pages/surveys/surveys.module').then( m => m.SurveysPageModule)
  },  {
    path: 'complete-survey-twelve-steps',
    loadChildren: () => import('./pages/complete-survey-twelve-steps/complete-survey-twelve-steps.module').then( m => m.CompleteSurveyTwelveStepsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
