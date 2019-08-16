import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AprobarUsuariosService } from '../services/aprobar-usuarios.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'aprobar-usuarios',
  templateUrl: './aprobar-usuarios.component.html',
  styleUrls: ['./aprobar-usuarios.component.css']
})
export class AprobarUsuariosComponent implements OnInit {
  config: any = [];
  usuariosAprobar: any = [];
  roles: any = [];
  rolSelected: any;

  @ViewChild("modalAprobar") modalAprobar: ElementRef;
  modalOptions: NgbModalOptions = {};
  
  constructor(private aprobarUsuarioService : AprobarUsuariosService,
    private modalService: NgbModal) {
    this.obtenerUsuarios();
   }

  ngOnInit() {
  }

  obtenerUsuarios(){
    this.aprobarUsuarioService.obtenerUsuarios().subscribe((data: {}) => {
      this.config = data;
      this.usuariosAprobar = this.config.UsuariosDB;
      this.roles = this.config.RolesDB;
      console.log(this.usuariosAprobar);
      console.log(this.roles);
    });
  }

  certificarUsuario(event, usuario){   
    if(event.target.checked)
    {
      console.log(usuario);
      this.modalService.open(this.modalAprobar, this.modalOptions);
    }
  }

  cerrarModalAsignacion() {
    this.modalService.dismissAll(this.modalAprobar);
  }

  guardarAsignacion(){
    console.log(this.rolSelected);
  }


}
