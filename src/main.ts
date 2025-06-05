// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { AboutComponent } from './app/about/about.component';
import { HomeComponent } from './app/home/home.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: 'about', component: AboutComponent },
      { path: '', component: HomeComponent },
    ])
  ]
});
