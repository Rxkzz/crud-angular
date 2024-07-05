import { Component } from '@angular/core';
import { AxiosService } from '../../axios.service'; // Sesuaikan path sesuai struktur proyek Anda
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

  constructor(private axiosService: AxiosService) {}

  handleSave(): void {
    this.isSaving = true;
    this.axiosService.addEquipment({ modelName: this.modelName, description: this.description, location: this.location })
      .then(response => {
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
      })
      .catch(error => {
        this.isSaving = false;
        console.error('Error saving project:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save project. Please check your input and try again.',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }
}
