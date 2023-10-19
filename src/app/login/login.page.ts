import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { UsuarioLogin } from '../servicios/usuarioLogin';
import { RetoserviceService } from '../servicios/retoservice.service';
import { StorageService } from '../servicios/storage.service';
import { Usuario } from '../servicios/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuarioLogin: UsuarioLogin = new UsuarioLogin();

  public usuario: Usuario | null = null;

  constructor(public storageService: StorageService, public retoService: RetoserviceService, public route: Router ) { }

  ngOnInit() {
    this.getUsuarioFromStorage();
  }

  async getUsuarioFromStorage()
  {
    await this.storageService.get('usuario').then(value => {if(value == null)
      {
        this.route.navigateByUrl('inicio', {replaceUrl :true})
      }
      else
      {
        this.usuario = value
        this.getUsuarioFromBBDD();
      }
    });
    
  }

  async getUsuarioFromBBDD()
  {
    await this.retoService.getUsuarioId(this.usuario!.idusuario).subscribe({next : value => {
      this.usuario = value;
    }});
  }

  async login()
  {
    await this.retoService.login(this.usuarioLogin).subscribe({
      next : value => {
        this.usuario = value;
        document.getElementById("errorLabel")!.innerHTML = "";
        this.guardarUsuario();
      },
      error(err) {
        console.log(err);
        document.getElementById("errorLabel")!.innerHTML = "Usuario o contraseña incorrecta";
      },
    })
  }

  async guardarUsuario()
  {
    await this.storageService.set('usuario', this.usuario).then(value => {
      window.location.reload();
    });
  }

  async logout()
  {
    await this.storageService.set('usuario', null);
    this.route.navigateByUrl('inicio', {replaceUrl: true});
    window.location.reload();
  }

}
