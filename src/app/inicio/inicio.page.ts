import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RetoserviceService } from '../servicios/retoservice.service';
import { IonModal } from '@ionic/angular';
import { Curso } from '../servicios/curso';
import { UsuarioLogin } from '../servicios/usuarioLogin';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public cursos : Curso[] = new Array();

  public usuarioLogin: UsuarioLogin = new UsuarioLogin();

  public canDismiss = false;

  @ViewChild(IonModal) modal!: IonModal;

  constructor(public retoService: RetoserviceService) { }

  ngOnInit() {
    this.getCursos();
  }

  async getCursos()
  {
    await this.retoService.getCursos().subscribe({
      next : value => {
        this.cursos = value;
      },
      error(err) {
        console.log(err)
      }
    });
  }

  
}
