import { Component, Inject, NgModule } from '@angular/core';
import { ProjectService } from '../project.service';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent { 
  name:string = ''
  description:string = ''
  location:string = ''
  isSaving:boolean = false
 
  constructor(@Inject(ProjectService) public projectService: ProjectService) {}
 
  handleSave(){
    this.isSaving = true
    this.projectService.create({name:this.name, description:this.description, location:this.location})
    .then(({data}) => {
      this.isSaving = false
      Swal.fire({
        icon: 'success',
        title: 'Project saved successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      this.name = ""
      this.description = ""
      this.location = ""
      return data
 
    }).catch(error => {
      this.isSaving = false
      Swal.fire({
        icon: 'error',
        title: 'An Error Occured!',
        showConfirmButton: false,
        timer: 1500
      })
      return error
    })
  }
   
 
}