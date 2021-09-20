import { Tecnico } from './../../../models/tecnico';
import { ActivatedRoute, Router } from '@angular/router';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      resposta.perfis = [];
      this.tecnico = resposta;
    });
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico excluído com sucesso', 'Excluir');
      this.router.navigate(['tecnicos']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);          
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

}
