import { Component, OnInit } from '@angular/core';
import { Livro } from '../model/livro';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livros-view',
  templateUrl: './livros-view.component.html',
  styleUrls: ['./livros-view.component.css']
})
export class LivrosViewComponent implements OnInit {

  livro : Livro = new Livro();

  constructor(private firestore : AngularFirestore, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(data=>{
      let id = data.get('id');
      this.firestore.collection('livro').doc(id).snapshotChanges().subscribe(data=>{
        this.livro = data.payload.data() as Livro;
      this.livro.id = data.payload.id;      
    
    })
    
    })

  }

}
