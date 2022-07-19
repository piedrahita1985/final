import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


import { estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit , OnDestroy {
  form: FormGroup;
  suscription: Subscription;
  estud: estudiante;
  IdEstudiante = 0; 

  constructor(private formBuilder: FormBuilder, private estudianteservice: EstudianteService, private Toastr: ToastrService  ) {
    this.form = this.formBuilder.group({
      idEstudiante: 0,
      strCedulaEstudiante: ['',[Validators.required]],
      strNombreEstudiante: ['',[Validators.required]],
      intEdadEstudiante: ['',[Validators.required, Validators.maxLength(2)]]
    });
   }

  ngOnInit(): void {
    this.suscription = this.estudianteservice.ObtenerEstudiante().subscribe(data =>{
      console.log(data);
      this.estud = data
      this.form.patchValue({
        strCedulaEstudiante: this.estud.strCedulaEstudiante,
        strNombreEstudiante: this.estud.strNombreEstudiante,
        intEdadEstudiante: this.estud.intEdadEstudiante
      })
      this.IdEstudiante = this.estud.idEstudiante;
    })
  }

  ngOnDestroy(): void {
      this.suscription.unsubscribe();
  }

  guardarEstudiante(){
    if(this.IdEstudiante === 0 || this.IdEstudiante == undefined){

      this.agregarEstudiante();
    }else{

      this.editarEstudainte();
    }

  
  }

  agregarEstudiante(){
      const estudiantes: estudiante = {
      strCedulaEstudiante: this.form.get('strCedulaEstudiante').value,
      strNombreEstudiante: this.form.get('strNombreEstudiante').value,
      intEdadEstudiante: Number(this.form.get('intEdadEstudiante').value)
    }
      this.estudianteservice.guardarEstudiante(estudiantes).subscribe(data =>{
      this.Toastr.success("Estudiando Guardado")
      this.estudianteservice.obtenerEstudiantes();
      this.form.reset();
    })
  }

  editarEstudainte(){
    const estudiantes: estudiante = {
      idEstudiante: this.estud.idEstudiante,
      strCedulaEstudiante: this.form.get('strCedulaEstudiante').value,
      strNombreEstudiante: this.form.get('strNombreEstudiante').value,
      intEdadEstudiante: Number(this.form.get('intEdadEstudiante').value)
    };
    this.estudianteservice.actualizarEstudiante(this.IdEstudiante, estudiantes).subscribe(data =>{
      this.Toastr.info("Estudiando Actualizado")
      this.estudianteservice.obtenerEstudiantes();
      this.form.reset();
      this.IdEstudiante = 0;
    })
  }

}
