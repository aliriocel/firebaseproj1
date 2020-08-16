import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../model/cliente';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  message : String = null;
  formGroup : FormGroup;
  idUser : string = "";
  cliente : Cliente = new Cliente();

  constructor(private formBuilder : FormBuilder,
    private auth : AngularFireAuth,
    private firestore : AngularFirestore) {
    this.iniciarForm();
  }

  ngOnInit(): void {
    this.auth.currentUser.then(data=>{
      this.idUser = data.uid;
      this.dadosCliente();
    })
  }

  dadosCliente(){
    this.firestore.collection('cliente').doc(this.idUser).snapshotChanges().subscribe(data=>{
      
      if(data.payload.data()!==undefined){

        this.cliente = data.payload.data() as Cliente;
       
        this.formGroup.controls['nome'].setValue(this.cliente.nome);
        this.formGroup.controls['telefone'].setValue(this.cliente.telefone);
        this.formGroup.controls['email'].setValue(this.cliente.email);
        this.formGroup.controls['endereco'].setValue(this.cliente.endereco);
        this.formGroup.controls['cpf'].setValue(this.cliente.cpf);
      }      

    })
  }

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      nome : ['',[Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      cpf: ['', [Validators.required]]   
   

    })
  }

  atualiza(){
    
    this.firestore.collection('cliente').doc(this.idUser)
      .set(this.formGroup.value).then(data=>{
        this.message = "Atualizado com sucesso";
    })
  }

}