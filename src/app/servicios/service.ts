import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Service {

  private readonly LISTAR_USUARIO: string = 'http://localhost:9191/empresas';
  private readonly AGREGAR_USUARIO: string = 'http://localhost:9191/addEmpresa';

  constructor(private http: HttpClient) { }





  public listarEmpresa(): Observable<any> {
    return this.http.get<any>(this.LISTAR_USUARIO)
      .pipe(
        catchError(this.handleError)
      );
  }

  public agregarEmpresa(data: any): Observable<any> {
    return this.http.post<any>(this.AGREGAR_USUARIO, data)
      .pipe(
        catchError(this.handleError)
      );
  }



  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
