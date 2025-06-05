import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Halaman Home</h1>
    <p>Ini adalah halaman Home sederhana di Angular.</p>

    <button (click)="showMessage()">Klik Saya</button>
  `,
  standalone: true
})
export class HomeComponent implements OnInit {
  ngOnInit() { // Seperti useEffect di React
    console.log('HomeComponent initialized');
  }

  showMessage() {
    alert('Tombol diklik!');
  }
}
