import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Libro } from '../../models/libri.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.page.html',
  styleUrls: ['./libro.page.scss'],
})
export class LibroPage implements OnInit {
  public libro: Libro;
  constructor(private navController: NavController, private router: Router,
              private route: ActivatedRoute, private firestoreService: FirestoreService,
              public authservice: AuthService, public toastController: ToastController) { }

  ngOnInit() {
    const libroId: string =  this.route.snapshot.paramMap.get('id');
    console.log('Libro: ' + libroId);
    this.firestoreService.getLibro(libroId).subscribe(libro => {
      this.libro = libro;
    });
  }
  favorite() {
    if(this.userLoggedIn()){
      this.presentToast('Libro aggiunto ai Preferiti!');
      //aggiungo il preferito chiamando il metodo e passandogli l'uid dell'utente collegato e l'id del libro preferito
      console.log('UID: ' + this.authservice.getUserUid());
      console.log('LibroID: ' + this.route.snapshot.paramMap.get('id'));
      this.firestoreService.aggiungiPreferito(this.authservice.getUserUid(), this.route.snapshot.paramMap.get('id'));
      this.router.navigate(['/libro', this.route.snapshot.paramMap.get('id')]);
    }
    else {
      this.presentToast('Devi effettuare il Login!').then( res=>
          this.router.navigate(['/login']),
        err => console.log(err)
      );
    }
  }
  linkPrestito(){
    if(this.userLoggedIn()){
      this.router.navigate(['/prestito']);
    }
    else {
      this.presentToast('Devi effettuare il Login!').then( res=>
          this.router.navigate(['/login']),
        err => console.log(err)
      );
    }
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
  async presentToast(mex) {
    const toast = await this.toastController.create({
      message: '' + mex,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  favoriteBook() {
    if(this.userLoggedIn()){
      console.log('libro preferito');
    return true;
      //this.firestoreService.verificaPreferito(this.authservice.getUserUid(), this.route.snapshot.paramMap.get('id'));
      }
    else {
      console.log('libro non preferito');
      return false;}
    // return false; //libro non preferito
  }
}
