import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  categories = ['Web Development', 'Web Design', 'Graphic Design'];
  skills = ['Angular', 'CSS', 'HTML', 'JS', 'Bootstrap', 'AdobeXD'];
  gallery: any[] = [];
  isDraggingOver!: boolean;
  http: any;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    
   }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      title: '',
      highlight: '',
      description: '',
      categories: this.formBuilder.array([]),
      skills: this.formBuilder.array([]),
      keyImage: null,
      gallery: []
    });
    this.gallery = [];
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.categories.forEach(() => this.categoriesFormArray.push(this.formBuilder.control(false)));
    this.skills.forEach(() => this.skillsFormArray.push(this.formBuilder.control(false)));
  }

  get categoriesFormArray() {
    return this.projectForm.controls['categories'] as FormArray;
  }

  get skillsFormArray() {
    return this.projectForm.controls['skills'] as FormArray;
  }

  onKeyImageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.projectForm.patchValue({
        keyImage: file
      });
    }
  }
  
  onGallerySelected(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.gallery.push(files[i]);
      }
      this.projectForm.patchValue({
        gallery: this.gallery
      });
    }
  }
  
  
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.projectForm.patchValue({
        keyImage: file
      });
    }
  }
  
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver = true;
  }
  
  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isDraggingOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      this.projectForm.patchValue({
        keyImage: file
      });
    }
  }
 

  // onSubmit() {
  //   const selectedCategories = this.categoriesFormArray.value
  //     .map((checked: any, i: any) => checked ? this.categories[i] : null)
  //     .filter((v: null) => v !== null);
  //   const selectedSkills = this.skillsFormArray.value
  //     .map((checked: any, i: any) => checked ? this.skills[i] : null)
  //     .filter((v: null) => v !== null);

  //   console.log({
  //     title: this.projectForm.value.title,
  //     highlight: this.projectForm.value.highlight,
  //     description: this.projectForm.value.description,
  //     categories: selectedCategories,
  //     skills: selectedSkills
  //   });
  //   this.projectForm.reset();
  // }

  onSubmit() {
    const selectedCategories = this.categoriesFormArray.value
      .map((checked: any, i: any) => checked ? this.categories[i] : null)
      .filter((v: null) => v !== null);
    const selectedSkills = this.skillsFormArray.value
      .map((checked: any, i: any) => checked ? this.skills[i] : null)
      .filter((v: null) => v !== null);
  
    const formData = new FormData();
    formData.append('title', this.projectForm.value.title);
    formData.append('highlight', this.projectForm.value.highlight);
    formData.append('description', this.projectForm.value.description);
    formData.append('categories', JSON.stringify(selectedCategories));
    formData.append('skills', JSON.stringify(selectedSkills));
    formData.append('keyImage', this.projectForm.value.keyImage);
  
    for (let i = 0; i < this.projectForm.value.gallery.length; i++) {
      formData.append('gallery', this.projectForm.value.gallery[i]);
    }
 
    // submit the form data to the server here
    console.log(formData);
   // make the HTTP request to the server
   this.http.post('/api/projects', formData).subscribe(
     (    response: any) => {
      console.log('Success:', response);
      // handle success response from server
    },
     (    error: any) => {
      console.error('Error:', error);
      // handle error response from server
    }
  );
    // this.projectForm.reset();
  }
  
  
}
