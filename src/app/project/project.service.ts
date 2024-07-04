import { Injectable } from '@angular/core';
import axios from 'axios';
import { Project } from './project';
 
@Injectable({
  providedIn: 'root'
})
 
export class ProjectService {
 
  getAll (): Promise<any>{
    return axios.get('/api/projects')
  }
 
  delete (id:number): Promise<any>{
    return axios.delete('/api/projects/' + id)
  }
 
  create(data:any): Promise<any>{
    let payload = {
      name: data.name,
      description: data.description
    }
 
    return axios.post('/api/projects', payload)
  }
 
  show (id:number): Promise<any>{
    return axios.get('/api/projects/' + id)
  }
 
  update(data:Project): Promise<any>{
    let payload = {
      name: data.name,
      description: data.description
    }
 
    return axios.patch('/api/projects/' + data.id, payload)
  }
 
}