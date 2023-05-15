import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@angular/fire/app';

// import { Project } from './project.model'; // Import the project model if you have one

export interface Project {
  title: string;
  highlight: string;
  description: string;
  skills: string[];
  category: string[];
  keyIMG: string;
  gallery: string[];
}

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {

  objects!: any; // Define a new variable to store the projects

  constructor() { }

  getProjects(): Observable<Project[]> {
    const db = getFirestore(getApp());
    const projectsCollection = collection(db, 'projects');
    const projects$ = new Observable<Project[]>((observer) => {
      getDocs(projectsCollection)
        .then((snapshot) => {
          const projects = snapshot.docs.map((doc) => doc.data() as Project);
          this.objects = projects; // Assign the fetched projects to the 'objects' variable
          observer.next(projects);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
    return projects$;
  }
  
  addProject(project: Project): Promise<void> {
    const db = getFirestore(getApp());
    const projectsCollection = collection(db, 'projects');
    return addDoc(projectsCollection, project)
      .then(() => {
        // Successfully added the document
      })
      .catch((error) => {
        // Handle the error
        throw error;
      });
  }
  
  
}
  


