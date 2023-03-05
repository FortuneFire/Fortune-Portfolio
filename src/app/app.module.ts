import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProjectFormComponent } from './components/projects/project-form.component';
import { NgxFileDropModule } from 'ngx-file-drop';

const appRoutes = [
  {path: "", component: HomeComponent },
  {path: "portfolio", component: PortfolioComponent },
  {path: "dashboard", component: DashboardComponent },
  // { path: 'github', component: GithubComponent },
  // { path: 'blog', component: BlogComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    DashboardComponent,
    HeaderComponent,
    SignInComponent,
    ProjectFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
