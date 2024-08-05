import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faCircle,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../shared/interfaces/task.interface';
import { AuthService } from '../../../../core/auth/auth.service';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import {
  animate,
  sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AbmFormComponent } from '../abm-form/abm-form.component';
import { TodoService } from '../../todo.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { MatMenuModule } from '@angular/material/menu';

const ELEMENT_DATA: Task[] = [];

/**
 * @title Table with selection
 */

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatMenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  animations: [
    trigger('rowsAnimation', [
      transition('void => *', [
        style({
          height: '*',
          opacity: '0',
          transform: 'translateX(-550px)',
          'box-shadow': 'none',
        }),
        sequence([
          animate(
            '.35s ease',
            style({
              height: '*',
              opacity: '.2',
              transform: 'translateX(0)',
              'box-shadow': 'none',
            }),
          ),
          animate(
            '.35s ease',
            style({
              height: '*',
              opacity: 1,
              transform: 'translateX(0)',
            }),
          ),
        ]),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  public faEdit = faEdit;
  public faTrash = faTrash;
  public faCheckCircle = faCheckCircle;
  public faCircle = faCircle;
  displayedColumns: string[] = [
    'name',
    'description',
    'completed',
    'createdAt',
    'action',
  ];
  dataSource = new MatTableDataSource<Task>(ELEMENT_DATA);
  selection = new SelectionModel<Task>(true, []);

  private authService = inject(AuthService);
  private todoService = inject(TodoService);
  private dialogService = inject(DialogService);
  private router = inject(Router);

  editTaskTest = input();
  userId: string = '';
  limit: number = 10;
  startAfter?: string;
  totalTasks: number = 1;
  isLoading: boolean = true;
  loadingRows: any[] = Array(10).fill({}); // Array de 5 elementos para las filas de carga
  excecuteCreate = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.excecuteCreate()) {
        this.createTask();
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.userId = this.authService.getUserData()?.email ?? '';
    if (this.userId) {
      this.loadTasks();
    } else {
      this.router.navigate(['/login']);
    }
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Ítems por página'; // Ajusta el texto aquí
    }
  }

  loadTasks(): void {
    if (!this.userId) return;

    this.todoService
      .getUserTasks(this.userId, this.limit, this.startAfter)
      .subscribe({
        next: (data: { tasks: Task[]; totalCount: number }) => {
          const tasks = data.tasks;
          this.dataSource.data = [...this.dataSource.data, ...tasks];
          this.totalTasks = data.totalCount; // Actualiza totalCount
          if (data.tasks.length > 0) {
            this.startAfter = tasks[tasks.length - 1].id;
          }
          this.isLoading = false;
          this.paginator.length = this.totalTasks;
        },
        error: (error) => {
          console.warn('Error loading tasks', error);
          this.isLoading = false;
        },
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  toggleCompleteTask(element: Task): void {
    element.completed = !element.completed;
    this.todoService.updateUserTask(this.userId, element).subscribe({
      next: () => {
        this.isLoading = true;
        this.dataSource.data = [];
        this.startAfter = undefined;
        this.paginator.pageIndex = 0;
        this.loadTasks();
      },
      error: (error) => {
        console.warn('Error updating task', error);
      },
    });
  }

  editTask(element: Task): void {
    const dialogRef = this.dialogService.openDialog(AbmFormComponent, {
      task: element,
      newTask: false,
    });
    this.dialogService.openedDialog?.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.startAfter = undefined;
        this.paginator.pageIndex = 0;
        this.loadTasks();
      }
    });
    dialogRef.updateSize('30%', 'auto');
  }

  deleteTask(element: Task): void {
    this.todoService.deleteUserTask(this.userId, element).subscribe({
      next: () => {
        this.isLoading = true;
        this.dataSource.data = [];
        this.startAfter = undefined;
        this.paginator.pageIndex = 0;
        this.loadTasks();
      },
      error: (error) => {
        console.warn('Error deleting task', error);
      },
    });
  }

  createTask(): void {
    this.dialogService.openedDialog?.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.startAfter = undefined;
        this.paginator.pageIndex = 0;
        this.loadTasks();
      }
    });
  }
  onPageChange(event: PageEvent): void {
    if (event.pageIndex === 0) {
      this.startAfter = undefined;
    }
    this.limit = event.pageSize;
    this.isLoading = true;
    this.dataSource.data = [];
    this.loadTasks();
  }
}
