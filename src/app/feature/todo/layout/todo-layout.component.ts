import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { TableComponent } from '../components/table/table.component';
import { TodoService } from '../todo.service';
import { AuthService } from '../../../core/auth/auth.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AbmFormComponent } from '../components/abm-form/abm-form.component';

@Component({
  selector: 'app-todo-layout',
  standalone: true,
  imports: [TableComponent, MatButtonModule],
  templateUrl: './todo-layout.component.html',
  styleUrl: './todo-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoLayoutComponent {
  toDoService = inject(TodoService);
  authSevice = inject(AuthService);
  dialogService = inject(DialogService);
  router = inject(Router);
  createTask = this.toDoService.createTask();

  excecute: boolean = false;

  constructor() {
    effect(() => {
      const user = this.authSevice.getUserData().email;
      const task = this.toDoService.getUpdatedTask();
      if (!this.toDoService.canSearch) return;

      this.toDoService.updateUserTask(user, task).subscribe({
        next: () => {
          const editDialog = this.dialogService?.openedDialog;
          if (editDialog) {
            editDialog.componentInstance.isLoading = false;
            editDialog.close(true);
            this.toDoService.canSearch = false;
          }
        },
        error: (error) => {
          console.warn('Error updating task', error);
        },
      });
    });
    effect(() => {
      const user = this.authSevice.getUserData().email;
      const task = this.toDoService.getCreateTask();
      if (!this.toDoService.canSearch) return;
      this.toDoService.createUserTask(user, task).subscribe({
        next: () => {
          const createDialog = this.dialogService?.openedDialog;
          if (createDialog) {
            createDialog.componentInstance.isLoading = false;
            createDialog.close(true);
            this.toDoService.canSearch = false;
          }
        },
        error: (error) => {
          console.warn('Error creating task', error);
        },
      });
    });
  }

  createNewTask(): void {
    const dialogRef = this.dialogService.openDialog(AbmFormComponent, {
      task: undefined,
      newTask: true,
    });

    this.excecute = true;
    dialogRef.updateSize('30%', 'auto');
  }

  goToLogin(): void {
    this.authSevice.logout();
    this.router.navigate(['/login']);
  }
}
