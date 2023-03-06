import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  categories = ['Web Development', 'Web Design', 'Graphic Design'];
  skills = ['Angular', 'CSS', 'HTML', 'JS', 'Bootstrap', 'AdobeXD'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      title: '',
      highlight: '',
      description: '',
      categories: this.formBuilder.array([]),
      skills: this.formBuilder.array([])
    });
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

  onSubmit() {
    const selectedCategories = this.categoriesFormArray.value
      .map((checked: any, i: any) => checked ? this.categories[i] : null)
      .filter((v: null) => v !== null);
    const selectedSkills = this.skillsFormArray.value
      .map((checked: any, i: any) => checked ? this.skills[i] : null)
      .filter((v: null) => v !== null);

    console.log({
      title: this.projectForm.value.title,
      highlight: this.projectForm.value.highlight,
      description: this.projectForm.value.description,
      categories: selectedCategories,
      skills: selectedSkills
    });
    this.projectForm.reset();
  }
}
