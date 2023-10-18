import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RetoserviceService } from '../servicios/retoservice.service';
import { StorageService } from '../servicios/storage.service';
import { IonModal } from '@ionic/angular';
import { Curso } from '../servicios/curso';
import { Usuario } from '../servicios/usuario';
import { UsuarioLogin } from '../servicios/usuarioLogin';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public cursos = new Array();

  public usuario: Usuario | null = null;

  public not: any | null = null;

  constructor(public retoService: RetoserviceService, public storageService: StorageService) { }

  ngOnInit() {
    this.getCursos();
  }


  async getCursos()
  {
    await this.storageService.get('usuario').then(value => {this.usuario = value});

    if(this.usuario != null)
    {
      await this.getUsuarioId(this.usuario.idusuario);
      await this.retoService.getCursosUsuario(this.usuario!.idusuario, this.usuario!.admin).subscribe({
        next : value => {
          if(this.usuario?.admin == 1)
          {
            for (let i = 0; i < value.length; i++) {
              value[i].usuarios = value[i].usuarios.split(',');
              value[i].notas = value[i].notas.split(',');
              console.log(value[i].notas);
            }
          }
          
          this.cursos = value;
        },
        error(err) {
          console.log(err)
        }
      });
    }
  }

  public expandirCurso(id: string)
  {
    const nota = document.getElementById(id);
    if(nota?.getAttribute("hidden") != null)
    {
      nota?.removeAttribute("hidden");
    } else 
    {
      nota?.setAttribute("hidden",'');
    }
  }

  
  async getUsuarioId(id: number)
  {
    await this.retoService.getUsuarioId(id).subscribe({next : value => {
      this.usuario = value;
    }});
  }
  
}
