import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { RefreshTokenResolverService } from './core/services/refresh-token-resolver.service';
import { LayoutComponent } from './core/views/layout/layout.component';
import { InternListComponent } from './intern/intern-list/intern-list.component';
import { LoginComponent } from './login/views/login/login.component';
import { CustomerListComponent } from './maintenance/customer/customer-list/customer-list.component';
import { EducationCenterListComponent } from './maintenance/education-center/education-center-list/education-center-list.component';
import { EducationListComponent } from './maintenance/education/education-list/education-list.component';
import { EnglishLevelListComponent } from './maintenance/english-level/english-level-list/english-level-list.component';
import { TechnologyListComponent } from './maintenance/technology/technology-list/technology-list.component';
import { PersonalListComponent } from './personal/personal-list/personal-list.component';
import { PyramidListComponent } from './pyramid/pyramid-list/pyramid-list.component';
import { PyramidTeamListComponent } from './pyramid/pyramid-team-list/pyramid-team-list.component';
import { OrganizationListComponent } from './organization/organization-list/organization-list.component';

export const DefaultRoutes = [
  {role:'PERSONAL', path: '/personal'},
  {role:'INTERN', path: '/intern'},
  {role:'MAINTENANCE', path: '/pyramid'},
];


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    resolve: {credentials: RefreshTokenResolverService},
    children: [
      { path: 'personal', component: PersonalListComponent, data:{role:['PERSONAL']}},
      { path: 'intern', component: InternListComponent, data:{role:['INTERN']}},
      { path: 'pyramid', component: PyramidListComponent, data:{role:['PERSONAL']}},
      { path: 'pyramid-team', component: PyramidTeamListComponent, data:{role:['PERSONAL']}},
      { path: 'organization', component: OrganizationListComponent, data:{role:['PERSONAL']}},      
      { path: 'customer', component: CustomerListComponent, data:{role:['MAINTENANCE']}},
      { path: 'education', component: EducationListComponent, data:{role:['MAINTENANCE']}},
      { path: 'education-center', component: EducationCenterListComponent, data:{role:['MAINTENANCE']}},
      { path: 'level', component: EnglishLevelListComponent, data:{role:['MAINTENANCE']}},
      { path: 'technology', component: TechnologyListComponent, data:{role:['MAINTENANCE']}},
      { path: '**', redirectTo: 'personal', pathMatch: 'full' },
    ]
  },  
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
