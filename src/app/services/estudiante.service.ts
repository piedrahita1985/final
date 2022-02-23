import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  myAppUrl = 'http://crudestudiantes.somee.com/';
  myApiUrl = 'api/estudiante/';
  list: estudiante[];
  private actualizarFormulario = new BehaviorSubject<estudiante>({} as any);

  constructor(private http: HttpClient) { }
  

  guardarEstudiante(estudiantes: estudiante): Observable<estudiante>{
    return this.http.post<estudiante>(`${this.myAppUrl}${this.myApiUrl}`, estudiantes)
  }

  obtenerEstudiantes(){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`).toPromise()
                                      .then  (data => {
                                        this.list = data as estudiante[];
                                      });     
  }

  EliminarEstudiante(id: number): Observable<estudiante>{
    return this.http.delete<estudiante>(this.myAppUrl + this.myApiUrl + id)
  }

  actualizarEstudiante(id: number, estudiante: estudiante): Observable<estudiante>{
    return this.http.put<estudiante>(this.myAppUrl + this.myApiUrl + id, estudiante)  
  }

  actualizar(estudiantes: any){
    this.actualizarFormulario.next(estudiantes);
  }

  ObtenerEstudiante(): Observable<estudiante>{
    return this.actualizarFormulario.asObservable();
  }

}
