import { Component, OnInit } from '@angular/core';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
// export class PortfolioComponent implements OnInit {

//   selectedCard: any;
//   selectedFilter = 'All';
//   projects = this.portfolioService.projects;
//   filteredProjects = this.projects;

//   constructor(private portfolioService: PortfolioService) { }

//   // projects!: [];

//   ngOnInit(): void {
//   }

  

//   project_categories = Array.from(new Set(this.projects.map(objects => project.category).flat()));

//   project_filter_categories = ['All', ...this.project_categories];

//   onCategoryClick(project_category: string) {
//     this.selectedFilter = project_category;
//     if (project_category === 'All') {
//       this.filteredProjects = this.projects;
//     } else {
//       this.filteredProjects = this.projects.filter(project => project.category.includes(project_category));
//     }
//   }

 
  

//   onCardClick(card: any) {
//     console.log(card)
//     this.selectedCard = card;
//   }
//   backToCards() {
//     this.selectedCard = null;
//   }

// }
export class PortfolioComponent implements OnInit {

  selectedCard: any;
  selectedFilter = 'All';
  projects: Project[] = [];
  filteredProjects: Project[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getProjects().subscribe(
      (projects) => {
        this.projects = projects;
        this.filteredProjects = projects;
        this.project_categories = Array.from(new Set(this.projects.map((object: { category: any; }) => object.category).flat()));
        this.project_filter_categories = ['All', ...this.project_categories];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  project_categories: string[] = [];
  project_filter_categories: string[] = [];

  onCategoryClick(project_category: string) {
    this.selectedFilter = project_category;
    if (project_category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((object: { category: string | string[]; }) => object.category.includes(project_category));
    }
  }

  onCardClick(card: any) {
    console.log(card);
    this.selectedCard = card;
  }

  backToCards() {
    this.selectedCard = null;
  }

}
