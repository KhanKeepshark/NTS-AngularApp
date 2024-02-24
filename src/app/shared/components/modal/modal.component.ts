import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from '@/services/modal';
import { todosData } from '@/data/todos';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ButtonComponent,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  FaTrash = faTrash;
  FaEdit = faEdit;
  chosenDate = this.ModalService.itemDate;
  todos = todosData[this.chosenDate.toDateString()] || [];
  form = new FormGroup({
    todoText: new FormControl('')
  });
  isEdit: number | null = null;

  constructor(public ModalService: ModalService) {
    console.log(this.todos);
  }

  addTodo(): void {
    if (this.form.value.todoText) {
      if (this.isEdit) {
        this.todos = this.todos.map(todo => {
          if (todo.id === this.isEdit) {
            todo.text = this.form.value.todoText ?? '';
          }
          return todo;
        });
        this.isEdit = null;
      } else {
        this.todos.push({
          id: this.todos[this.todos.length - 1]?.id + 1 || 1,
          text: this.form.value.todoText
        });
      }
      todosData[this.chosenDate?.toDateString()] = this.todos;
      this.form.reset();
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    if (!this.todos.length) {
      delete todosData[this.chosenDate?.toDateString()];
      return;
    }
    todosData[this.chosenDate?.toDateString()] = this.todos;
  }

  editTodo(id: number): void {
    this.isEdit = id;
    this.form.setValue({
      todoText: this.todos.find(todo => todo.id === id)?.text ?? ''
    });
  }
}
