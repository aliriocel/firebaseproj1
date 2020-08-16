import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  formGroup : FormGroup;
  message : string = null;

  constructor(
    private formBuilder : FormBuilder, 
    private firestore: AngularFirestore,
    private route: ActivatedRoute,)  {
      this.iniciarForm();
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(resp=>{
      let id = resp.get('id');
      this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(data=>{
        let cliente : Cliente = data.payload.data() as Cliente;
        this.formGroup.controls['nome'].setValue(cliente.nome);
        this.formGroup.controls['cpf'].setValue(cliente.cpf);
        this.formGroup.controls['telefone'].setValue(cliente.telefone);
        this.formGroup.controls['endereco'].setValue(cliente.endereco);
        this.formGroup.controls['email'].setValue(cliente.email);
      })
    });
  }

  

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      nome : ['',[Validators.required]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      email: ['', [Validators.required]]
   

    })
  }

  onSubmit(){
  
    this.route.paramMap.subscribe(resp=>{

      let id = resp.get('id');
  
      this.firestore.collection('cliente').doc(id).set(this.formGroup.value).then(() =>{
              this.message = "Atualizado com sucesso!";
            
            }).catch(()=>{
              this.message = "Erro ao atualizar"; 
            })

          })
  }

}