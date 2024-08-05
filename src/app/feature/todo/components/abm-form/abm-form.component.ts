import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Task } from '../../../../shared/interfaces/task.interface';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-abm-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './abm-form.component.html',
  styleUrl: './abm-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbmFormComponent implements OnInit {
  toDoService = inject(TodoService);

  constructor(
    public dialogRef: MatDialogRef<AbmFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task; newTask: boolean },
  ) {}
  isLoading: boolean = false;
  newTask: boolean = false;

  editForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    completed: new FormControl(false),
    createdAt: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit(): void {
    if (this.data && this.data.task) {
      this.editForm.patchValue(this.data.task);
    }
    if (this.data && this.data.newTask) {
      this.newTask = this.data.newTask;
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.toDoService.canSearch = true;
    if (this.newTask) {
      this.toDoService.createTask.set(this.editForm.getRawValue() as Task);
    } else {
      this.toDoService.updateTask.set(this.editForm.getRawValue() as Task);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
