import { ChamadoService } from './../../../services/chamado.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chamdo-list',
  templateUrl: './chamdo-list.component.html',
  styleUrls: ['./chamdo-list.component.css']
})
export class ChamdoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = []
  FILTERED_DATA: Chamado[] = []

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ChamadoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'Aberto'
    } else if (status == '1') {
      return 'Em andamento'
    } else {
      return 'Encerrado'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'Baixa'
    } else if (prioridade == '1') {
      return 'Média'
    } else {
      return 'Alta'
    }
  }

  orderByStatus(status: any): void {
    let list: Chamado[] = []
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status) {
        list.push(element)
      }
    });
    this.FILTERED_DATA = list
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
