import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-libri-prenotati',
  templateUrl: './libri-prenotati.page.html',
  styleUrls: ['./libri-prenotati.page.scss'],
})
export class LibriPrenotatiPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }
}
