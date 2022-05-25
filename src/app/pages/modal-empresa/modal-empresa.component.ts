import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Service } from 'src/app/servicios/service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css']
})
export class ModalEmpresaComponent implements OnInit {

  listaSucursal: any[] = [];
  valida :boolean= false;
  firstFormGroup: FormGroup = this._formBuilder.group({
    intCodigo: ['', [Validators.required]],
    strNombre: ['', [Validators.required]],
    strUser: ['', [Validators.required]],
    strPassword: ['', [Validators.required]],
    intCodSucursal: ['', [Validators.required]]

  });


  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<ModalEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: Service) {


    if (data === null || data === undefined) {
      return;
    }

    this.firstFormGroup = this._formBuilder.group({

      intCodigo: [data.data.cod_usuario,],
      strNombre: [data.data.nombre, [Validators.required]],
      strUser: [data.data.user, [Validators.required]],
      strPassword: [data.data.password, [Validators.required]],
      intCodSucursal: [data.data.cod_sucursal, [Validators.required]]

    });
    console.log(this.firstFormGroup.value);

  }

  ngOnInit(): void {

  }


  grabarUsuario() {
    this.validar();
    if(this.valida==false){
    let param = {
      id_usuario: this.firstFormGroup.value.intCodigo,
      ruc: this.firstFormGroup.value.strNombre,
      razonSocial: this.firstFormGroup.value.strUser,
      direccion: this.firstFormGroup.value.strPassword,
      estado: "A"
    }

    console.log(param);
    this.getGrabar(param);

  }
  }



  private getGrabar(param: any) {

    this.service.agregarEmpresa(param).subscribe((data) => {

      this.dialogRef.close(true);

    }, (err) => {

    });
  }

private validar(){
    this.valida=false
if(this.firstFormGroup.value.strNombre==""){
  this.valida=true
}
if(this.firstFormGroup.value.strUser==""){
  this.valida=true
}
if(this.firstFormGroup.value.strPassword==""){
  this.valida=true
}
return this.valida;
  }

}
