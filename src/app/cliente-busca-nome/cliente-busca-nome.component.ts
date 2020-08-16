import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cliente-busca-nome',
  templateUrl: './cliente-busca-nome.component.html',
  styleUrls: ['./cliente-busca-nome.component.css']
})
export class ClienteBuscaNomeComponent implements OnInit {

itens : any[] = [];
resultados : boolean = false;
texto : string = '';
busca : string ='';

  constructor(private stg : AngularFireStorage,private firestore: AngularFirestore) { }

  ngOnInit(): void {
    
  }

  download(cliente : Cliente){
    this.stg.storage.ref().child(`cliente/${cliente.id}.jpg`).getDownloadURL().then(data=>{
      console.log(data);
      cliente.imgUrl = data;
      
      this.itens.push(cliente);

      
    }).catch(()=>{
      this.itens.push(cliente);
    })
  }

  buscar(){
    

    this.itens = [];

    this.busca = this.texto;

    let clienteRef = this.firestore.collection('cliente',
    ref => ref.orderBy("nome").startAt(this.texto).endAt(this.texto + "\uf8ff"));
    
    clienteRef.snapshotChanges().subscribe(data=>{
      this.itens = [];

      data.map(obj=>{
        let cliente : Cliente = obj.payload.doc.data() as Cliente;
        cliente.id = obj.payload.doc.id;
        this.download(cliente);
      })
      

     
    })
  }

  
}
