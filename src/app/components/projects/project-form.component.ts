import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  categories = ['Web Dev', 'Web Design', 'Graphic Design'];
  skills = ['Angular', 'CSS', 'HTML', 'JS', 'Bootstrap', 'AdobeXD', 'Photoshop', 'Illustrator'];
  gallery: any[] = [];
  isDraggingOver = false;

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) {}

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
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.categories.forEach(() => this.categoriesFormArray.push(this.formBuilder.control(false)));
    this.skills.forEach(() => this.skillsFormArray.push(this.formBuilder.control(false)));
  }

  get categoriesFormArray() {
    return this.projectForm.get('categories') as FormArray;
  }

  get skillsFormArray() {
    return this.projectForm.get('skills') as FormArray;
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

  onSubmit() {
    const selectedCategories = this.categoriesFormArray.value
      .map((checked: boolean, i: number) => checked ? this.categories[i] : null)
      .filter((v: string | null) => v !== null);
    const selectedSkills = this.skillsFormArray.value
      .map((checked: boolean, i: number) => checked ? this.skills[i] : null)
      .filter((v: string | null) => v !== null);

    const projectData: Project = {
      title: this.projectForm.value.title,
      highlight: this.projectForm.value.highlight,
      description: this.projectForm.value.description,
      skills: selectedSkills,
      category: selectedCategories,
      keyIMG: '', // Placeholder for the key image URL (to be updated later)
      gallery:[] // Placeholder for the gallery image URLs (to be updated later)
    };

    this.portfolioService.addProject(projectData)
    .then(() => {
      // Reset the form and any other necessary operations after successful submission
      this.projectForm.reset();
    })
    .catch((error) => {
      // Handle any errors that occur during the submission
      console.error('Error:', error);
    });

  }
}