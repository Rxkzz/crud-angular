import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../project.service'; // Sesuaikan path sesuai struktur proyek Anda
import Swal from 'sweetalert2';
import { Project } from '../project';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  projects: Project[] = [];

  constructor(private axiosService: AxiosService) {}

  ngOnInit(): void {
    this.fetchProjectList();
  }

  fetchProjectList(): void {
    this.axiosService.getEquipment()
      .then(response => {
        this.projects = response;
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          text: 'Failed to fetch projects.',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  handleDelete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Attempting to delete project with ID: ${id}`); // Log ID
        this.axiosService.deleteEquipment(id)
          .then(() => {
            console.log(`Project with ID: ${id} deleted successfully`); // Log success
            Swal.fire({
              icon: 'success',
              title: 'Project deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            });
            this.fetchProjectList();
          })
          .catch(error => {
            console.error('Error deleting project:', error);
            Swal.fire({
              icon: 'error',
              title: 'An Error Occurred!',
              text: 'Failed to delete project.',
              showConfirmButton: false,
              timer: 1500
            });
          });
      }
    });
  }
}
