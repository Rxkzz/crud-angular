import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../../axios.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Project } from '../project'; // Pastikan Project sesuai dengan struktur data yang diperlukan

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  project: Project;
  isSaving: boolean = false;

  constructor(
    private axiosService: AxiosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.project = {
      id: this.route.snapshot.params['id'], // Ambil ID dari URL
      modelName: '',
      description: '',
      location: ''
    };
  }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject(): void {
    this.axiosService.getEquipmentById(this.project.id)
      .then(response => {
        this.project = response; // Update project dengan data dari API
      })
      .catch(error => {
        console.error('Error loading project:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load project details.',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  handleSave(): void {
    this.isSaving = true;
    this.axiosService.updateEquipment(this.project)
      .then(() => {
        this.isSaving = false;
        Swal.fire({
          icon: 'success',
          title: 'Project saved successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/show', this.project.id]);
      })
      .catch(error => {
        this.isSaving = false;
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          text: 'Failed to save project. Please try again later.',
          showConfirmButton: false,
          timer: 1500
        });
        console.error('Error updating project:', error);
      });
  }
}
