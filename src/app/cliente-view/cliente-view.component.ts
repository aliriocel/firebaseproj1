import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-cliente-view',
  templateUrl: './cliente-view.component.html',
  styleUrls: ['./cliente-view.component.css']
})
export class ClienteViewComponent implements OnInit {
  cliente : Cliente = new Cliente();
  urlImage : any;
  constructor(private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private storage : AngularFireStorage,
    private router: Router) {
    }

  ngOnInit(): void {

    this.route.paramMap.subscribe(resp=>{

      let id = resp.get('id');

      this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(data=>{
        this.cliente = data.payload.data() as Cliente;
        this.cliente.id = data.payload.id;
        this.download();
      })
    })    
  }


  download(){
    this.storage.storage.ref().child(`cliente/${this.cliente.id}.jpg`).getDownloadURL().then(data=>{
      console.log(data);
      this.urlImage = data;
    })
  }

}