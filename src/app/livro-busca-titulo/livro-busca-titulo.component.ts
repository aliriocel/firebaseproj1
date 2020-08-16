import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Livro } from '../model/livro';

@Component({
  selector: 'app-livro-busca-titulo',
  templateUrl: './livro-busca-titulo.component.html',
  styleUrls: ['./livro-busca-titulo.component.css']
})
export class LivroBuscaTituloComponent implements OnInit {

itens : any[] = [];
resultados : boolean = false;
texto : string = '';
busca : string ='';

  constructor(private stg : AngularFireStorage,private firestore: AngularFirestore) { }

  ngOnInit(): void {
    
  }

  download(livro : Livro){
    this.stg.storage.ref().child(`livro/${livro.id}.jpg`).getDownloadURL().then(data=>{
      console.log(data);
      livro.imgUrl = data;
      
      this.itens.push(livro);

      
    }).catch(()=>{
      this.itens.push(livro);
    })
  }

  buscar(){
    

    this.itens = [];

    this.busca = this.texto;

    let livroRef = this.firestore.collection('livro',
    ref => ref.orderBy("titulo").startAt(this.texto).endAt(this.texto + "\uf8ff"));
    
    livroRef.snapshotChanges().subscribe(data=>{
      this.itens = [];

      data.map(obj=>{
        let livro : Livro = obj.payload.doc.data() as Livro;
        livro.id = obj.payload.doc.id;
        this.download(livro);
      })
      

     
    })
  }

  
}
