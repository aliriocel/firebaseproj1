import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  message: string = null;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private auth: AngularFireAuth) {
    this.iniciarForm();
  }


  ngOnInit(): void {
  }

  iniciarForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
  }

  tryLogin() {

    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value;

    //  console.log(user + pass);
    this.router.navigate(['livros']);
    this.auth.signInWithEmailAndPassword(user, pass).then(data => {
      // this.message = 'usuario ok';
    }).catch(data => {
      this.message = 'usuario invalido';
    })
  }

}
