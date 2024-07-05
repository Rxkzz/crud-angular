import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchProjectList();
  }

  fetchProjectList(): void {
    this.projectService.getAll()
      .subscribe(
        (data) => {
          this.projects = data; // Update projects with entire response object
        },
        (error) => {
          console.error('Error fetching projects:', error);
          Swal.fire({
            icon: 'error',
            title: 'An Error Occurred!',
            text: 'Failed to fetch projects.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
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
        this.projectService.delete(id)
          .subscribe(
            () => {
              Swal.fire({
                icon: 'success',
                title: 'Project deleted successfully!',
                showConfirmButton: false,
                timer: 1500
              });
              this.fetchProjectList(); // Reload project list after deletion
            },
            (error) => {
              console.error('Error deleting project:', error);
              Swal.fire({
                icon: 'error',
                title: 'An Error Occurred!',
                text: 'Failed to delete project.',
                showConfirmButton: false,
                timer: 1500
              });
            }
          );
      }
    });
  }
}
