import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../project';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  project: Project;

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

  navigateToIndex(): void {
    this.router.navigate(['/index']);
  }
}
