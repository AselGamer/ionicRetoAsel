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

  getUsuarioId($id: number): Observable<Usuario>
  {
    return this.httpClient.get<Usuario>(this.url + '/usuarios/'+$id);
  }

  getAllUsuarios(): Observable<Usuario[]>
  {
    return this.httpClient.get<any>(this.url + '/usuarios/');
  }

  getAllCursos(): Observable<Curso[]>
  {
    return this.httpClient.get<any>(this.url + '/cursos/');
  }

  login($usuarioLogin: UsuarioLogin): Observable<Usuario>
  {
    return this.httpClient.post<Usuario>(this.url + '/usuarios/login', $usuarioLogin);
  }

  insertUsuario($usuarioInsert: Usuario): Observable<Object>
  {
    return this.httpClient.post<Usuario>(this.url + '/usuarios/add', $usuarioInsert);
  }

  deleteUsuario($idUsuario: Number): Observable<Object>
  {
    return this.httpClient.delete<Usuario>(this.url + '/usuarios/delete/'+$idUsuario);
  }

  insertUsuarioIntoCurso($usuarioCurso: Object): Observable<Object>
  {
    return this.httpClient.post<Object>(this.url + '/usuarios/curso/add', $usuarioCurso);
  }
}
