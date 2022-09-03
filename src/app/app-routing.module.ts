import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Auth/login/login.component";
import { RegisterComponent } from "./Auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { dashboardRoutes } from "./dashboard/dashboard.route";
import { AuthGuard } from "./services/auth.guard";
import { FooterComponent } from "./shared/footer/footer.component";



const routes: Routes = [
    {
      path: '', 
      component: DashboardComponent,
      children: dashboardRoutes,
      canActivate: [AuthGuard]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'footer', component: FooterComponent},
    {path: '**', redirectTo: ''}
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})

export class AppRoutingModule{

}