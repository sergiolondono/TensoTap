import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AprobarUsuariosService } from "../services/aprobar-usuarios.service";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { MensajesService } from '../mensajes.service';
import { UserXRol } from '../_models/UserXRol';

declare var $;

@Component({
  selector: "aprobar-usuarios",
  templateUrl: "./aprobar-usuarios.component.html",
  styleUrls: ["./aprobar-usuarios.component.css"]
})
export class AprobarUsuariosComponent implements OnInit {
  config: any = [];
  usuariosAprobar: any = [];
  roles: any = [];
  rolSelected: any;
  usuarioSelected: any;
  usuarioXrol;

  @ViewChild("dataTable") table;
  dataTable: any;
  dtOptions: DataTables.Settings = {};

  message = '';

  @ViewChild("modalAprobar") modalAprobar: ElementRef;
  modalOptions: NgbModalOptions = {};

  constructor(
    private aprobarUsuarioService: AprobarUsuariosService,
    private modalService: NgbModal,
    private toastr: MensajesService,) {
    this.obtenerUsuarios();
  }

  ngOnInit() {}

  obtenerUsuarios() {
    this.aprobarUsuarioService.obtenerUsuarios().subscribe((data: {}) => {
      this.config = data;
      this.usuariosAprobar = this.config.UsuariosDB;
      this.roles = this.config.RolesDB;
      console.log(this.usuariosAprobar);
      console.log(this.roles);

      this.configDataTable();
      
    });
  }

  configDataTable(){
    this.dtOptions = { 
      destroy: true,
      processing: true, 
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ elementos",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
        infoEmpty: "Mostrando ningún elemento.",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      },
      data: this.usuariosAprobar,
      pageLength: 5,        
      lengthMenu: [5, 10, 15, 20],
      columns: [
        { title: "UserName", data: "userName" },
        { title: "Nombre", data: "nombre" },
        { title: "Apellidos", data: "apellidos" },
        { title: "Identificación", data: "identificacion" },
        { title: "Email", data: "email" },
        {
          title: "Certificar",
          render: function() {
            return (
              '<div class="text-center">'+
              '<button type="button" class="btn btn-default">'+
              '<span class="input-group-text"><i class="fa fa-user-plus"></i></span>'+
              '</button>'+
              '</div>'
            );
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.usuarioSelected = data;
          console.log(this.usuarioSelected);
          self.modalService.open(this.modalAprobar, this.modalOptions);
        });
        return row;
      }
    };

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);
  }

  cerrarModalAsignacion() {
    this.modalService.dismissAll(this.modalAprobar);
  }

  guardarAsignacion() {
    this.usuarioXrol = new UserXRol();
    this.usuarioXrol.userName = this.usuarioSelected.userName;
    this.usuarioXrol.roleId = this.rolSelected;
    this.usuarioXrol.usuarioCreacion = localStorage.getItem('user');
    this.usuarioXrol.usuarioModificacion = localStorage.getItem('user');

    this.aprobarUsuarioService.guardarUsuarioXRol(this.usuarioXrol).subscribe(result => {
      this.toastr.showSuccess('REGISTRO EXITOSO!');

      this.obtenerUsuarios();

     }, (err) => {
      this.toastr.showError(`El registro no se guardo de forma correcta! \n ${err}`);
     });

    this.cerrarModalAsignacion();    

    console.log(this.usuarioXrol.userName + "\n" +
      this.usuarioXrol.roleId + "\n" +
      this.usuarioXrol.usuarioCreacion + "\n" + 
      this.usuarioXrol.usuarioModificacion);
  }
}
