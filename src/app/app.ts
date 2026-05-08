import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apis } from './apis';
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Project3');
  constructor(public service: Apis){
    this.loadingLogic()
  }
  loading = signal<boolean>(false)

  loadingLogic(){
    this.service.loaderTruck.subscribe((data: boolean) => {
      this.loading.set(data)
    })
  }
}
