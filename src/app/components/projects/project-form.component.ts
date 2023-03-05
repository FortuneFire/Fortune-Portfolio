

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit{
  projectForm!: FormGroup;
  categories = [{name:'Web Development', value:'Web Development'}, 
                {name:'Web Design', value:'Web Design'}, 
                {name:'Graphic Design', value: 'Graphic Design'}
              ];

  skills = [ {name:'Angular', value:'Angular'}, 
              {name:'CSS', value:'CSS'}, 
              {name:'HTML', value:'HTML'}, 
              {name:'JS', value:'JS'}, 
              {name:'Boostrap', value:'Boostrap'}, 
              {name:'AdobeXD', value:'AdobeXD'}, 
              {name:'Photoshop', value:'Photoshop'}, 
              {name:'Illustrator', value:'Illustrator'}, 
              {name:'Wordpress', value:'Wordpress'}
            ];
  keyImageFile!: File;
  galleryImageFiles: File[] = [];
  keyImageSrc: string | null = null;
  galleryImageSrcs: string[] = [];
  // showLabels = false;

  constructor(private fb: FormBuilder) {
    
      this.projectForm = this.fb.group({
        title: ['', Validators.required],
        highlight: ['', Validators.required],
        description: ['', Validators.required],
        category: this.addCategoryCheckboxes(),
        skills: this.addSkillsCheckboxes(),
        keyIMG: ['', Validators.required],
        gallery: [[]]
      });
   
  }

  get skillsFormArray() {
    return this.projectForm.controls['skills'] as FormArray;
  }

  get categoryFormArray() {
    return this.projectForm.controls['category'] as FormArray;
  }
  

  ngOnInit(): void {
    // this.showLabels = true;
  }

  
  addCategoryCheckboxes() {
    const arr = this.categories.map(category => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }


  addSkillsCheckboxes() {
    const arr = this.skills.map(skill => {
      return this.fb.control(skill);
    });
    return this.fb.array(arr);
  }

















  onKeyImageDropped(event: any) {
     // Get the dropped file from the event
  const file = event.files[0];
  
  // Assign the file to the keyImageFile property
  this.keyImageFile = file;
  }

  onKeyImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.keyImageFile = file;
    this.keyImageSrc = URL.createObjectURL(file);
  }

  onGalleryImageDropped(event: any) {
    const files = event.files;
  
    // Loop through the files and add them to the galleryImageFiles array
    for (const file of files) {
      this.galleryImageFiles.push(file);
    }
  }

  onGalleryImageSelected(event: any) {
    this.galleryImageFiles = [];
    for (let i = 0; i < event.target.files.length; i++) {
      this.galleryImageFiles.push(event.target.files[i]);
    }
  }


  onSubmit() {
        // const selectedCategories = this.projectForm.value.category
        //   .map((checked: any, index: string | number) => checked ? this.categories[2] : null)
        //   .filter((value: null) => value !== null);
        // const selectedSkills = this.projectForm.value.skills
        //   .map((checked: any, index: string | number) => checked ? this.skills[1] : null)
        //   .filter((value: null) => value !== null);
    
        // const project = {
        //   title: this.projectForm.value.title,
        //   highlight: this.projectForm.value.highlight,
        //   description: this.projectForm.value.description,
        //   category: selectedCategories,
        //   skills: selectedSkills,
        //   keyIMG: this.keyImageFile ? URL.createObjectURL(this.keyImageFile) : '',
        //   gallery: []
        // };
    
        // for (const file of this.galleryImageFiles) {
        //   project.gallery.push(URL.createObjectURL(file));
        // }
    
        // console.log(project);
        
        this.projectForm.reset();
      }
    
    }