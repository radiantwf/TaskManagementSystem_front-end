import {
  Component, OnInit, Input
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './../../service/task.service';
import { ProjectService } from './../../service/project.service';
import { ProductService } from './../../service/product.service';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css'],
})

export class ElementListComponent implements OnInit {
  elements: any[] = [];
  id: string = '';
  searchCriteria: string = null;
  page: number;
  lastPage: number;
  displayPageNumbers: string[];
  counts: any;
  jumpPage: number;
  elementType: string = '';
  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let reg = new RegExp('/[a-zA-Z0-9]+');
    let r = reg.exec(this.router.url);
    if (r != null) {
      this.elementType = r[0].toString().substring(1).toLowerCase();
    } else {
      this.elementType = null;
    }
    this.activatedRoute.params.subscribe(params => {
      if (typeof (params['page']) === undefined) {
        this.page = 1;
      } else {
        this.page = parseInt(params['page'], 1);
      }
      if (typeof (params['searchCriteria']) !== undefined) {
        this.searchCriteria = params['searchCriteria'];
      }
      switch (this.elementType) {
        case 'project':
          this.getProjects();
          break;
        case 'product':
          this.getProducts();
          break;
        default:
          this.getTasks();
          break;
      }
    });
  }

  getTasks() {
    this.taskService.getTaskCounts()
      .subscribe(counts => {
        if (counts !== null) {
          this.counts = counts;
          AppGlobal.getInstance().lastPage = Math.ceil(counts.total / AppGlobal.getInstance().pageSize);
          this.lastPage = AppGlobal.getInstance().lastPage;
          let pages = new Array<string>();
          for (let i = 1; i <= this.lastPage; i++) {
            if (this.lastPage <= 8) {
              pages.push(i.toString());
              continue;
            }
            if (i <= 3) {
              pages.push(i.toString());
              continue;
            }
            if (i >= this.lastPage - 1) {
              pages.push(i.toString());
              continue;
            }
            if (i >= this.page - 1 && i <= this.page + 1) {
              pages.push(i.toString());
              continue;
            }
            if (i === this.page - 2 || i === this.page + 2) {
              if (this.page === 6 || this.page === this.lastPage - 4) {
                pages.push(i.toString());
              } else {
                pages.push('...');
                continue;
              }
            }
          }
          this.displayPageNumbers = pages;
        }
      });
    this.taskService.getTasks(this.searchCriteria, this.page)
      .then(tasks => this.elements = tasks);
  }

  getProjects() {
    this.projectService.getProjectCounts()
      .subscribe(counts => {
        if (counts !== null) {
          this.counts = counts;
          AppGlobal.getInstance().lastPage = Math.ceil(counts.total / AppGlobal.getInstance().pageSize);
          this.lastPage = AppGlobal.getInstance().lastPage;
          let pages = new Array<string>();
          for (let i = 1; i <= this.lastPage; i++) {
            if (this.lastPage <= 8) {
              pages.push(i.toString());
              continue;
            }
            if (i <= 3) {
              pages.push(i.toString());
              continue;
            }
            if (i >= this.lastPage - 1) {
              pages.push(i.toString());
              continue;
            }
            if (i >= this.page - 1 && i <= this.page + 1) {
              pages.push(i.toString());
              continue;
            }
            if (i === this.page - 2 || i === this.page + 2) {
              if (this.page === 6 || this.page === this.lastPage - 4) {
                pages.push(i.toString());
              } else {
                pages.push('...');
                continue;
              }
            }
          }
          this.displayPageNumbers = pages;
        }
      });
    this.projectService.getProjects(this.searchCriteria, this.page)
      .then(projects => this.elements = projects);
  }

  getProducts() {
    this.productService.getProductCounts()
      .subscribe(counts => {
        if (counts !== null) {
          this.counts = counts;
          AppGlobal.getInstance().lastPage = Math.ceil(counts.total / AppGlobal.getInstance().pageSize);
          this.lastPage = AppGlobal.getInstance().lastPage;
          let pages = new Array<string>();
          for (let i = 1; i <= this.lastPage; i++) {
            if (this.lastPage <= 8) {
              pages.push(i.toString());
              continue;
            }
            if (i <= 3) {
              pages.push(i.toString());
              continue;
            }
            if (i >= this.lastPage - 1) {
              pages.push(i.toString());
              continue;
            }
            if (i >= this.page - 1 && i <= this.page + 1) {
              pages.push(i.toString());
              continue;
            }
            if (i === this.page - 2 || i === this.page + 2) {
              if (this.page === 6 || this.page === this.lastPage - 4) {
                pages.push(i.toString());
              } else {
                pages.push('...');
                continue;
              }
            }
          }
          this.displayPageNumbers = pages;
        }
      });
    this.productService.getProducts(this.searchCriteria, this.page)
      .then(products => this.elements = products);
  }

  onDetailClicked(event) {
    if (this.id === event) {
      this.id = '';
    } else {
      this.id = event;
    }
  }
  clickPage(clickedPage) {
    if (typeof (clickedPage) !== 'number') {
      this.jumpPage = null;
    }
    if (clickedPage <= 1) {
      clickedPage = 1;
    }
    if (clickedPage >= this.lastPage) {
      clickedPage = this.lastPage;
    }
    if (this.searchCriteria != null) {
      this.router.navigate([this.elementType, clickedPage.toString(), { searchCriteria: this.searchCriteria }]);
    } else {
      this.router.navigate([this.elementType, clickedPage.toString()]);
    }
  }
  prevPage() {
    let prevPage = 0;
    if (this.page <= 1) {
      prevPage = 1;
    } else {
      prevPage = this.page - 1;
    }
    if (this.searchCriteria != null) {
      this.router.navigate([this.elementType, prevPage.toString(), { searchCriteria: this.searchCriteria }]);
    } else {
      this.router.navigate([this.elementType, prevPage.toString()]);
    }
  }
  nextPage() {
    let nextPage = 0;
    if (this.page >= this.lastPage) {
      nextPage = this.lastPage;
    } else {
      nextPage = this.page + 1;
    }
    if (this.searchCriteria != null) {
      this.router.navigate([this.elementType, nextPage.toString(), { searchCriteria: this.searchCriteria }]);
    } else {
      this.router.navigate([this.elementType, nextPage.toString()]);
    }
  }
}
