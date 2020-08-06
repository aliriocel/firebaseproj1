import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-usuario-new',
  templateUrl: './usuario-new.component.html',
  styleUrls: ['./usuario-new.component.css']
})
export class UsuarioNewComponent implements OnInit {

  formGroup : FormGroup;
  message : string = null;

  constructor(
    private formBuilder : FormBuilder, 
    private auth: AngularFireAuth, 
    private router : Router,)  {
      this.iniciarForm();
    }

  ngOnInit(): void {
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    })
  }

  onSubmit(){
    this.auth.createUserWithEmailAndPassword(this.formGroup.controls['uername'].value,this.formGroup.controls['password'].value).then(()=>{
      this.router.navigate(['livros']);
    }).catch(()=>{
      this.message = "Erro ao cadastrar";
    })
     
}
}
