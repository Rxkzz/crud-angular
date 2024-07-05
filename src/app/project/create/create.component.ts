import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent { 
  modelName: string = '';
  description: string = '';
  location: string = '';
  isSaving: boolean = false;

  constructor(private projectService: ProjectService) {}

  handleSave(): void {
    this.isSaving = true;
    this.projectService.create({ modelName: this.modelName, description: this.description, location: this.location })
      .subscribe({
        next: (data) => {
          this.isSaving = false;
          Swal.fire({
            icon: 'success',
            title: 'Project saved successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          this.modelName = '';
          this.description = '';
          this.location = '';
          // Optionally, you can handle additional logic with 'data' returned from API
        },
        error: (error) => {
          this.isSaving = false;
          console.error('Error saving project:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something bad happened; please try again later.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  }
}
