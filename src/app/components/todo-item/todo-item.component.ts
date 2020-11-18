import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/Todo';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // set dynamic classes 
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.isCompleted,
    }

    return classes;
  }

  onToggleTodo(todo: Todo): void {
    // toggle on the UI
    todo.isCompleted = !todo.isCompleted;

    // toggle on the BE
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log('completed todo', todo)
    })
  };

  onDelClick(todo: Todo): void {
    this.deleteTodo.emit(todo);
  };

}
