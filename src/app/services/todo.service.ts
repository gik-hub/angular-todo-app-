import { Todo } from './../models/Todo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) { }

  // GEt todos
  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}?_limit=10`)
  }

  // Toggle Completed
  toggleCompleted(todo: Todo):Observable<any> {
    let url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions)
  }

  // Delete Todo
  deleteTodo(todo: Todo):Observable<any> {
    let url = `${this.todosUrl}/${todo.id}`
    return this.http.delete(url, httpOptions)
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions)
  }
}
