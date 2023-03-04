import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addProjectForm!: FormGroup;
  projectCategories!: [
    { name: 'Web Development' },
    { name: 'Web Design' },
    { name: 'Graphic Design' }
  ]

  constructor(private formBuilder: FormBuilder) { 
    this.addProjectForm = this.formBuilder.group({
      title: ['', Validators.required],
      highlight: ['', Validators.required],
      description: [''],
      skills: [''],
      keyIMG: ['', Validators.required],
      gallery: ['']
    });
    // this.addCategory();
  }


  get categoryArray() {
    return this.addProjectForm.controls['category'] as FormArray;
  }

  private addCategory() {
    this.projectCategories.forEach(() => this.categoryArray.push(new FormControl(false)));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addProjectForm.value);
  }

}
