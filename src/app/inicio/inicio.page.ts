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

  constructor(public retoService: RetoserviceService, public storageService: StorageService) { }

  ngOnInit() {
    this.getCursos();
  }


  async getCursos()
  {
    await this.storageService.get('usuario').then(value => {this.usuario = value});

    if(this.usuario != null)
    {
    await this.retoService.getCursosUsuario(this.usuario!.idusuario, this.usuario!.admin).subscribe({
      next : value => {
        this.cursos = value;
        console.log(this.cursos);
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
  
}
