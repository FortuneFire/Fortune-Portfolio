import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { getApp } from '@angular/fire/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


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
  
  // addProject(project: Project, imageFile: File): Promise<void> {
  //   const db = getFirestore(getApp());
  //   const projectsCollection = collection(db, 'projects');

  //   return new Promise<void>((resolve, reject) => {
  //     const storageRef = ref(getStorage(), `images/${imageFile.name}`);

  //     uploadBytes(storageRef, imageFile)
  //       .then(() => getDownloadURL(storageRef))
  //       .then((imageUrl) => {
  //         project.keyIMG = imageUrl;
  //         return addDoc(projectsCollection, project);
  //       })
  //       .then(() => {
  //         resolve(); // Successfully added the document
  //       })
  //       .catch((error) => {
  //         reject(error); // Handle the error
  //       });
  //   });
  // }

  addProject(project: Project, keyImageFile: File, galleryImageFiles: File[]): Promise<void> {
    const db = getFirestore(getApp());
    const projectsCollection = collection(db, 'projects');

    return new Promise<void>((resolve, reject) => {
      const storage = getStorage();
      const keyImageRef = ref(storage, `images/${keyImageFile.name}`);

      uploadBytes(keyImageRef, keyImageFile)
        .then(() => getDownloadURL(keyImageRef))
        .then((keyImageUrl) => {
          project.keyIMG = keyImageUrl;
          const galleryPromises = galleryImageFiles.map((file) => {
            const galleryImageRef = ref(storage, `images/${file.name}`);
            return uploadBytes(galleryImageRef, file)
              .then(() => getDownloadURL(galleryImageRef));
          });
          return Promise.all(galleryPromises);
        })
        .then((galleryImageUrls) => {
          project.gallery = galleryImageUrls;
          return addDoc(projectsCollection, project);
        })
        .then(() => {
          resolve(); // Successfully added the document
        })
        .catch((error) => {
          reject(error); // Handle the error
        });
    });
  }

  
}
  


