import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './main/header/header.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

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
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
