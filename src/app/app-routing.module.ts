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
        path: 'notification',
        loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
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
  },
  {
    path: 'complete-survey-twelve-steps',
    loadChildren: () => import('./pages/complete-survey-twelve-steps/complete-survey-twelve-steps.module').then( m => m.CompleteSurveyTwelveStepsPageModule)
  },
  {
    path: 'questions-survey-twelve-steps',
    loadChildren: () => import('./pages/questions-survey-twelve-steps/questions-survey-twelve-steps.module').then( m => m.QuestionsSurveyTwelveStepsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'member-detail',
    loadChildren: () => import('./pages/member-detail/member-detail.module').then( m => m.MemberDetailPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
