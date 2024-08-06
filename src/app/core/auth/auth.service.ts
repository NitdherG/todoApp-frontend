import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../shared/interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.baseUrl;

  #user = signal<User | null>(null);
  user = computed(() => this.#user());

  setUserData(user: User) {
    this.#user.set(user);
    localStorage.setItem('user', JSON.stringify(user)); // Guarda el usuario en el localStorage
  }

  getUserData(): User {
    // Primero, intenta obtener el usuario de #user
    const userFromSignal = this.#user();

    if (userFromSignal) {
      // Si hay un usuario en #user, lo devuelve
      return userFromSignal;
    }

    // Si no hay un usuario en #user, intenta obtenerlo del localStorage
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      // Si hay un usuario en localStorage, parsea y devuelve el objeto
      return JSON.parse(userFromLocalStorage) as User;
    }

    // Si no hay usuario en #user ni en localStorage, devuelve null
    return {
      id: '',
      email: '',
      createdAt: new Date(),
    };
  }

  checkUser(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/${email}`);
  }

  createUser(user: User): Observable<{ user: User; message: string }> {
    return this.httpClient.post<{ user: User; message: string }>(
      `${this.baseUrl}/users`,
      user,
    );
  }

  logout() {
    this.setUserData({
      id: '',
      email: '',
      createdAt: new Date(),
    });

    localStorage.removeItem('user');
  }
}
