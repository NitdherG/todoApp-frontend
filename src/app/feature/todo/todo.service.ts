import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../shared/interfaces/task.interface';
import { environment } from '../../../environments/environment';

/**
 * Service for managing todo tasks.
 * Provides methods for creating, updating, retrieving, and deleting tasks.
 */
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // Injecting HttpClient for making HTTP requests.
  httpClient = inject(HttpClient);

  // Signal for tracking the updated task state.
  updateTask = signal<Task>({
    id: '',
    name: '',
    description: '',
    completed: false,
    createdAt: '',
  });
  #updateTask = computed(this.updateTask);

  // Signal for tracking the created task state.
  createTask = signal<Task>({
    id: '',
    name: '',
    description: '',
    completed: false,
    createdAt: '',
  });
  #createTask = computed(this.createTask);

  // Flag indicating if search functionality is available.
  canSearch: boolean = false;

  /**
   * Retrieves the currently updated task.
   * @returns The current state of the updated task.
   */
  getUpdatedTask() {
    return this.#updateTask();
  }

  /**
   * Retrieves the currently created task.
   * @returns The current state of the created task.
   */
  getCreateTask() {
    return this.#createTask();
  }

  /**
   * Retrieves tasks for a specific user with pagination.
   * @param userId - The ID of the user whose tasks are to be retrieved.
   * @param limit - The number of tasks to retrieve.
   * @param startAfter - Optional parameter specifying the starting point for pagination.
   * @returns An observable of an object containing the array of tasks and total count.
   */
  getUserTasks(
    userId: string,
    limit: number,
    startAfter?: string,
  ): Observable<{ tasks: Task[]; totalCount: number }> {
    let params = new HttpParams().set('limit', limit.toString());

    // Log the startAfter parameter for debugging.
    console.log('startAfter', startAfter);
    if (startAfter) {
      params = params.set('startAfter', startAfter);
    }

    return this.httpClient.get<{
      tasks: Task[];
      totalCount: number;
    }>(`${environment.baseUrl}/users/${userId}/tasks`, { params });
  }

  /**
   * Creates a new task for a specific user.
   * @param email - The email of the user for whom the task is to be created.
   * @param task - The task to be created.
   * @returns An observable of the created task.
   */
  createUserTask(email: string, task: Task): Observable<Task> {
    return this.httpClient.post<Task>(
      `${environment.baseUrl}/users/${email}/tasks`,
      { task: task },
    );
  }

  /**
   * Updates a task for a specific user.
   * @param email - The email of the user whose task is to be updated.
   * @param task - The task to be updated.
   * @returns An observable of the updated task.
   */
  updateUserTask(email: string, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(
      `${environment.baseUrl}/users/${email}/tasks`,
      { task: task },
    );
  }

  /**
   * Deletes a task for a specific user.
   * @param email - The email of the user whose task is to be deleted.
   * @param task - The task to be deleted.
   * @returns An observable of the delete operation result.
   */
  deleteUserTask(email: string, task: Task): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseUrl}/users/${email}/tasks/${task.id}`,
    );
  }
}
