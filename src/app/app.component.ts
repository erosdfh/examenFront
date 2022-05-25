import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Service } from './servicios/service';
import { Util } from 'src/app/clases/Util';
import { ModalEmpresaComponent } from './pages/modal-empresa/modal-empresa.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';

  bMostrarEmpresa: boolean = false;



  displayedColumnsEmpresa: string[] = ['codigo', 'ruc', 'razonSocial', 'direccion'];
  dataSourceEmpresa: any[] = [];

  constructor(private router: Router, private _formBuilder: FormBuilder, public dialog: MatDialog,
    private service: Service) { }

  ngOnInit() {

    this.bMostrarEmpresa  = false;
  }

  listarEmpresa() {
    this.bMostrarEmpresa  = true;

    this.getListarEmpresa();
  }

  openModalEmpresa(row: any) {
    console.log(row);

    let dialogRef: any;

    let data: any = Util.clonar(row);

    dialogRef = this.dialog.open(ModalEmpresaComponent, {
      disableClose: false,
      width: '900px',
      height: '400px',
      data: { data }
    });

    this.dialog.afterAllClosed.subscribe(
      () => {
        this.listarEmpresa();
      }
    );

  }



  openModalGrabarEmpresa() {

    let dialogRef: any;

    dialogRef = this.dialog.open(ModalEmpresaComponent, {
      disableClose: false,
      width: '900px',
      height: '400px',
      data: undefined
    });

    this.dialog.afterAllClosed.subscribe(
      () => {
        this.listarEmpresa();
      }
    );


  }


  private getListarEmpresa() {
    this.dataSourceEmpresa = [];
    this.service.listarEmpresa().subscribe((data) => {
      console.log(data);
      this.dataSourceEmpresa = data;
    }, (err) => {

    });
  }


}
