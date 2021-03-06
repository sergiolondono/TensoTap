import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  constructor() { }

  configDataTable(dataSource, arrayColumns) {
    return {
      destroy: true,
      processing: true,
      autoWidth: true,
      autoHeight: true,
      dom: 'lfrtipB',
      initComplete(settings, json) {
        $('.button').removeClass('dt-button');
     },
     buttons: [
      {
           extend: 'excel',
           text: 'Exportar a Excel',
           filename: 'Digitalización Historia Laboral',
           className: 'table-button button btn btn-success m-2',
           key: {
            key: 'x',
            altKey: true
            }
         }
      ],
      order: [ 0, 'asc' ],
      language: {
        processing: 'Procesando...',
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando ningún elemento.',
        infoFiltered: '(filtrado _MAX_ elementos total)',
        infoPostFix: '',
        loadingRecords: 'Cargando registros...',
        zeroRecords: 'No se encontraron registros',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último'
        },
        aria: {
          sortAscending: ': Activar para ordenar la tabla en orden ascendente',
          sortDescending: ': Activar para ordenar la tabla en orden descendente'
        }
      },
      data: dataSource,
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
      columns: arrayColumns
    };
  }
}
