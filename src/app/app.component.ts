import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome</h1>
    <a routerLink="/about">Ke Halaman About</a>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
