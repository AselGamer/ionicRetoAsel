import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { UsuarioLogin } from './servicios/usuarioLogin';
import { RetoserviceService } from './servicios/retoservice.service';
import { StorageService } from './servicios/storage.service';
import { IonModal } from '@ionic/angular';
import { Usuario } from './servicios/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit{
  public appPages = [
    { title: 'Inicio', url: '/inicio', icon: 'mail' },
    { title: 'Alta', url: '/alta', icon: 'paper-plane' },
    { title: 'Login', url: '/login', icon: 'heart' },
  ];

  public usuarioLogin: UsuarioLogin = new UsuarioLogin();

  public usuario: Usuario = new Usuario();

  public canDismiss = false;

  @ViewChild(IonModal) modal!: IonModal;

  public labels = [];
  constructor(public retoService: RetoserviceService, public storageService: StorageService) {}

  ngOnInit() {
    this.getUsuario()
  }

  ngAfterViewInit() {
    if(this.modal != undefined && this.modal != null)
    {
      this.modal.present().then(resolve => {true}, reject => {true});
    }
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
      if(this.modal != undefined)
      {
        this.canDismiss = true;
        this.modal.dismiss();
      }
      window.location.reload();
    });
  }

  async getUsuario()
  {
    await this.storageService.get('usuario').then(value=>{
      if(value != null)
      {
        this.usuario = value;
      }
    }); 
  }

  enviarLogin()
  {
    this.login();
  }
}
