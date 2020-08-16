import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Livro } from '../model/livro';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

itens : any[] = [];

  constructor(private firestore : AngularFirestore, private stg : AngularFireStorage) { }

  ngOnInit(): void {
    this.firestore.collection('livro').snapshotChanges().subscribe(data=>{
     

      data.map(obj=>{
        let livro : Livro = obj.payload.doc.data() as Livro;
        livro.id = obj.payload.doc.id;
        this.download(livro);
      })
      
    })
  }

  download(livro : Livro){
    this.stg.storage.ref().child(`livro/${livro.id}.jpg`).getDownloadURL().then(data=>{
     
      livro.imgUrl = data;
      this.itens.push(livro);
    })
  }

}
