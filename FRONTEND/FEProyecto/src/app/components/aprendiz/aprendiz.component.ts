import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AprendizService } from 'src/app/services/aprendiz.service';

@Component({
  selector: 'app-aprendiz',
  templateUrl: './aprendiz.component.html',
  styleUrls: ['./aprendiz.component.css']
})
export class AprendizComponent implements OnInit {

  listAprendices : any []=[];
  accion="Agregar";

  form: FormGroup;
  id: any | undefined;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private _aprendizService : AprendizService) { 

    this.form = this.fb.group({
      IdCard:['',[Validators.required,Validators.maxLength(10), Validators.minLength(7)]],
      FirstName:['',Validators.required],
      LastName:['',Validators.required],
      Email:['',[Validators.required, Validators.email]],
      CellPhone:['',[Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      Program:['',Validators.required],
      Jornada:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.obtenerAprendiz();
  }

  obtenerAprendiz(){
    this._aprendizService.getListAprendices().subscribe(data =>
      {
        console.log(data);
        this.listAprendices = data;
      },
      error =>{
        console.log();
      });
  }
  
  agregarAprendiz(){
    const aprendiz: any = {
      IdCard: this.form.get('IdCard')?.value,
      FirstName: this.form.get('FirstName')?.value,
      LastName: this.form.get('LastName')?.value,
      Email: this.form.get('Email')?.value,
      CellPhone: this.form.get('CellPhone')?.value,
      Program: this.form.get('Program')?.value,
      Jornada: this.form.get('Jornada')?.value
    }

    if(this.id == undefined)
    {
      this._aprendizService.saveAprendices(aprendiz).subscribe(data =>
        {
          this.toastr.success('Aprendiz registrado correctamente','¡Bien!, Aprendiz registrado');
          this.obtenerAprendiz();
          this.form.reset();
        },
        error =>
        {
          this.toastr.error('Error capa 8, verifique si el servidor funciona','¡OH ,OH!, Error');
        })
    }else{
      aprendiz.id = this.id;
      this._aprendizService.updateAprendices(this.id,aprendiz).subscribe(data =>
      {
        this.form.reset();
        this.accion="Agregar";
        this.id = undefined;
        this.toastr.info('Aprendiz actualizado correctamente','¡Bien!, Aprendiz actualizado');
        this.obtenerAprendiz();
      },error =>{
        this.toastr.error('Error capa 8, verifique si el servidor funciona','¡OH ,OH!, Error');
      })
    }
  }

  eliminarAprendiz(id:number){
    this._aprendizService.deleteAprendices(id).subscribe(data=>{
      this.toastr.error('Aprendiz eliminado correctamente','¡Bien!, Aprendiz eliminado');
      this.obtenerAprendiz();
    }, 
    error=>{
      console.log(error);
    })
  }

  editarAprendiz(aprendiz:any)
  {
    this.accion="Editar";
    this.id = aprendiz.id;

    this.form.patchValue(
      {
        IdCard: aprendiz.idCard,
        FirstName: aprendiz.firstName,
        LastName: aprendiz.lastName,
        Email: aprendiz.email,
        CellPhone: aprendiz.cellPhone,
        Program: aprendiz.program,
        Jornada: aprendiz.jornada
      }
    )
  }
}
