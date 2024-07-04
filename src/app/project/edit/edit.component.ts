import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Project } from '../project';
 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  project: Project;
  isSaving: boolean = false;
 
  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.project = {
      id: this.route.snapshot.params['id'],
      name: '',
      description: ''
    };
  }
 
  ngOnInit(): void {
    this.projectService.show(this.route.snapshot.params['id']).then(({data}) => {
      this.project = data;
    }).catch(error => {return error});
  }
 
  handleSave(){
    this.isSaving = true;
    this.projectService.update(this.project)
    .then(({data}) => {
      this.isSaving = false;
      Swal.fire({
        icon: 'success',
        title: 'Project saved successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      return data;
    }).catch(error => {
      this.isSaving = false;
      Swal.fire({
        icon: 'error',
        title: 'An Error Occured!',
        showConfirmButton: false,
        timer: 1500
      });
      return error;
    });
  }
}