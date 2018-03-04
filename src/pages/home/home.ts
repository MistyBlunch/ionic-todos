import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable }        from 'rxjs/Observable';

import { Todo } from '../../shared/Todo';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  newTodo: string = null;

  done: boolean;

  todos: Todo[] = [];

  buttons = [
    {
      type: 'done',
      class: ''
    }, {
      type: 'pending',
      class: ''
    }, {
      type: 'all',
      class: 'button-large-md'
    }
  ];

  constructor(
    public navCtrl: NavController,
    private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
    this.showAll();
  }

  addTodo(todo: string) {
    if (todo === null) return;
    this.todoService.addTodo(todo);
    this.newTodo = null;
  }

  updateTodo(todo: any) {
    todo.done = !todo.done;
    this.todoService.updateTodo(todo.key, todo);
  }

  showDone() {
    this.done = true;
    this.buttons = this.remapButtons('done');
  }

  showPending() {
    this.done = false;
    this.buttons = this.remapButtons('pending');
  }

  showAll() {
    this.done = null;
    this.buttons = this.remapButtons('all');
  }

  private remapButtons(type: string) {
    return this.buttons.map(b => {
      if (b.type === type) {
        b.class = 'button-large-md';
      } else {
        b.class = '';
      }
      return b;
    });
  }

  buttonClass(type: string) {
    return this.buttons.filter(b => b.type === type)[0].class;
  }

}
