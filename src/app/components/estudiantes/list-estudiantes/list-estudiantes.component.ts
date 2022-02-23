import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.css']
})
export class ListEstudiantesComponent implements OnInit {

  constructor( public estudianteService: EstudianteService,
              public toastr: ToastrService ) { }

  ngOnInit(): void {
    this.estudianteService.obtenerEstudiantes();
  }

  eliminarEstudiante(estudiante: any){
    debugger
    if(confirm('Esta seguro que desea eliminar el estudiante')){
      this.estudianteService.EliminarEstudiante(estudiante.idEstudiante).subscribe(data => {
        this.toastr.warning('Estudiante Eliminado')
        this.estudianteService.obtenerEstudiantes();
      })
    }
  }

  editar(estudiantes: any){
    this.estudianteService.actualizar(estudiantes);
  }

}
