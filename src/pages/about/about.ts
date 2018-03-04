import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { FeedPage } from '../feed/feed';

import { DataService } from '../../shared/data.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  mostrarFoto: boolean = true;

  constructor(public navCtrl: NavController, public dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getQuestions().subscribe(data => {
      console.log('data', data);
    });
  }

  toggleFoto() {
    this.mostrarFoto = !this.mostrarFoto;
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  goToFeed() {
    this.navCtrl.push(FeedPage);
  }

  addQuestion(texto: string) {
    this.dataService.addQuestion(texto);
  }

  updateNivel(key: string) {
    this.dataService.updateNivel(key, 'avanzado');
  }


}
