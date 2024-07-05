import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AxiosService } from '../../axios.service';
import { Project } from '../project';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private axiosService: AxiosService
  ) {}

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.axiosService.getEquipmentById(projectId)
      .then((data: Project) => {
        this.project = data;
      })
      .catch((error: any) => {
        console.error('Error fetching project details:', error);
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          text: 'Failed to fetch project details.',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }
}
