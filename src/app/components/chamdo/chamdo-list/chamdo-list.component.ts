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

  ELEMENT_DATA: Chamado[] = [
    {
      id: 50,
      dataAbertura: '20/09/2021',
      dataFechamento: '21/09/2021',
      prioridade: 'Alta',
      status: 'Aberto',
      titulo: 'Notebook',
      descricao: 'Notebook não liga e esquenta muiti',
      tecnico: 1,
      cliente: 6,
      nomeCliente: 'Renatão',
      nomeTecnico: 'João Paulo'
    }
  ]

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
