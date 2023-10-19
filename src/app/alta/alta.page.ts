import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from '../servicios/usuarioLogin';
import { Usuario } from '../servicios/usuario';
import { Curso } from '../servicios/curso';
import { RetoserviceService } from '../servicios/retoservice.service';
import { StorageService } from '../servicios/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {

  public usuarioLogin: UsuarioLogin = new UsuarioLogin();

  public usuario: Usuario | null = null;

  public usuarios: Usuario[] | null = null;

  public cursos: Curso[] | null = null;

  public idSeleccionado: Number | null = null;

  public nota: number = 0;

  public cursoRelacion: Number | null = null;

  public usuarioRelacion: Number | null = null;

  constructor(public retoService: RetoserviceService, public storageService: StorageService, public router: Router) { }

  ngOnInit() {
    this.getUsuarioFromStorage()
  }

  async getUsuarioFromStorage()
  {
    this.storageService.get('usuario').then(value => {if(value == null || value.admin != 1)
      {
        this.router.navigateByUrl('inicio', {replaceUrl: true});
        window.location.reload();
      } else {
        this.usuario = value;
        this.getAllCursos();
        this.getAllUsuarios();
      }
    });
  }

  async getAllUsuarios()
  {
    await this.retoService.getAllUsuarios().subscribe(value => 
      {
        if(value != null)
        {
          this.usuarios = value;
        }
      });
  }

  async getAllCursos()
  {
    await this.retoService.getAllCursos().subscribe(value => 
      {
        if(value != null)
        {
          this.cursos = value;
        }
      });
  }

  async insertUsuario()
  {
    let usuarioInsert = Usuario.fromLoginUsuario(this.usuarioLogin);
    await this.retoService.insertUsuario(usuarioInsert).subscribe(
      {
        next : value => 
        {
          console.log(value);
          window.location.reload();
        }
      }
    );
  }

  async deleteUsuario()
  {
    if(this.idSeleccionado == null)
    {
      return;
    } else {
      await this.retoService.deleteUsuario(this.idSeleccionado).subscribe({next: value => {
        console.log(value);
        window.location.reload();
      }});
    }
  }

  async insertUsuarioIntoCurso()
  {
    console.log({idUsuario: Number(this.usuarioRelacion), idCurso: Number(this.cursoRelacion), nota: Number(this.nota)});
    await this.retoService.insertUsuarioIntoCurso({idUsuario: Number(this.usuarioRelacion), idCurso: Number(this.cursoRelacion), nota: Number(this.nota)}).subscribe(
      {next : value => {
        console.log(value);
        window.location.reload();
      }}
    )
  }

  public selectChanged($event: any)
  {
    this.idSeleccionado = $event.detail.value;
  }

  public usuChanged($event: any)
  {
    this.usuarioRelacion = $event.detail.value;
    console.log(this.usuarioRelacion);
  }

  public cursoChanged($event: any)
  {
    this.cursoRelacion = $event.detail.value;
    console.log($event.detail.value);
  }

  public validateKey($event: any)
  {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode($event.charCode);

    if (!pattern.test(inputChar)) {
      $event.preventDefault();
    }

  }

  public validateKeyUp($event: any)
  {
    console.log(this.nota > 10);
    if(this.nota > 10)
    {
      this.nota = 0;
    }
  }
}
