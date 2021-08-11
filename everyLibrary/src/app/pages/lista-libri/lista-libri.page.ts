import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Libro } from '../../models/libri.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { Biblioteca } from 'src/app/models/biblioteche.interface';

@Component({
  selector: 'app-lista-libri',
  templateUrl: './lista-libri.page.html',
  styleUrls: ['./lista-libri.page.scss'],
})
export class ListaLibriPage implements OnInit {
  public listaLibri: Observable<Libro[]>;
  constructor(private navController: NavController, private router: Router,
              private firestoreService: FirestoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    const bibliotecaId: string =  this.route.snapshot.paramMap.get('id');
    console.log('Biblio: ' + bibliotecaId);
    this.listaLibri = this.firestoreService.getListaLibriBiblioteca(bibliotecaId);
    console.log('Lista libri: ' + this.listaLibri);
  }

  linkLibro(){
    this.router.navigate(['/libro']);
  }
  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }
  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }
}
