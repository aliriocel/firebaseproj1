import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-cliente-new',
  templateUrl: './cliente-new.component.html',
  styleUrls: ['./cliente-new.component.css']
})
export class ClienteNewComponent implements OnInit {

  formGroup : FormGroup;
  message : string = null;

  constructor(
    private formBuilder : FormBuilder, private firestore: AngularFirestore)  {
      this.iniciarForm();
    }

  ngOnInit(): void {
  }

  iniciarForm(){
    this.formGroup= this.formBuilder.group({
      nome : ['',[Validators.required]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      endereco: ['', [Validators.required]]
   

    })
  }

  onSubmit(){
  
    console.log(this.formGroup.value); 
  
    this.firestore.collection('cliente').add(this.formGroup.value).then(() =>{
            this.message = "Cliente Cadastrado com sucesso!";
            this.formGroup.reset();
          }).catch(()=>{
            this.message = "Erro ao cadastrar"; 
          })

    
  }

}