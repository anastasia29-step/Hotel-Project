import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  ngAfterViewInit(): void {
    let reveals = document.querySelectorAll('.reveal');
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    });
    reveals.forEach(item => observer.observe(item));
  }
}
