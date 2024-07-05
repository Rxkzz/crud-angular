import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Project } from '../project';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  project: Project;
  isSaving: boolean = false;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.project = {
      id: this.route.snapshot.params['id'],
      modelName: '',
      description: '',
      location: ''
    };
  }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject(): void {
    this.projectService.show(this.project.id)
      .subscribe(
        (data) => {
          this.project = data; // Update project with entire response object
        },
        (error) => {
          console.error('Error loading project:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load project details.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
  }

  handleSave(): void {
    this.isSaving = true;
    this.projectService.update(this.project)
      .subscribe(
        () => {
          this.isSaving = false;
          Swal.fire({
            icon: 'success',
            title: 'Project saved successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/show', this.project.id]);
        },
        (error) => {
          this.isSaving = false;
          Swal.fire({
            icon: 'error',
            title: 'An Error Occurred!',
            showConfirmButton: false,
            timer: 1500
          });
          console.error('Error updating project:', error);
        }
      );
  }
}
