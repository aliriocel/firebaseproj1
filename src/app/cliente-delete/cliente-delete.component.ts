import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente : Cliente = new Cliente();

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private router : Router)  {
      
  }


  ngOnInit(): void {
      
    
    this.route.paramMap.subscribe(resp=>{

      let id = resp.get('id');

      this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(data=>{
        this.cliente = data.payload.data() as Cliente;
        this.cliente.id = data.payload.id;
        
      })
    })
  }
  
  excluir(){
    this.firestore.collection('cliente').doc(this.cliente.id).delete().then(()=>{
      this.router.navigate(['/cliente']);
    })
  }

}