import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs';
import { Curso } from './curso';
import { Usuario } from './usuario';
import { UsuarioLogin } from './usuarioLogin';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RetoserviceService {

  public url = "http://192.168.0.129:8000"

  constructor(public httpClient: HttpClient) { }

  getCursosUsuario($id: number, $admin: number): Observable<any>
  {
    return this.httpClient.post<Array<any>>(this.url + '/usuarios/curso', {admin:$admin, idUsuario:$id});
  }

  login($usuarioLogin: UsuarioLogin): Observable<Usuario>
  {
    return this.httpClient.post<Usuario>(this.url + '/usuarios/login', $usuarioLogin);
  }
}
