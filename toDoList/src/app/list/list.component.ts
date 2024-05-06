import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {TaskService} from "../services/task.service";
import {Task} from "../shared/Task.interface";
import {delay, take} from "rxjs";
import {DatePipe} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormField,
    MatDatepickerModule,
    DatePipe,
    MatCheckbox,
    FormsModule,
    MatIcon,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  public taskForm!: FormGroup;
  public taskList: Task[] = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
  }


  ngOnInit(): void {
    this.initializeForm();
    this.getAllTasks();
  }

  public initializeForm(): void {
    this.taskForm = this.fb.group({
      body: ['', Validators.required],
      deadline: ['', Validators.required],
    })
  }

  public getAllTasks(): void {
    this.taskService.getAllTasks().pipe(take(1))
      .subscribe((taskList: Task[]) => {
        this.taskList = taskList;
        this.sortTasks();
      })
  }

  public submitTaskForm(): void {
    if (this.taskForm.invalid) return;

    const newTask: Task = {
      ...this.taskForm.value,
      isDone: false,
    }

    this.taskService.addTask(newTask).pipe(take(1))
      .subscribe(d => {
        this.taskForm.reset();
        this.getAllTasks();
      })
  }

  public deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).pipe(take(1))
      .subscribe(d => {
        this.taskList = this.taskList.filter((task: Task) => task.id !== taskId);
      })
  }

  public updateTask(task: Task) {
    this.taskService.updateTask(task).pipe(delay(500), take(1))
      .subscribe(d => {
        this.getAllTasks()
      });
  }

  public cancelTaskForm(): void {
    this.taskForm.reset();
  }

  public sortTasks(): void {
    this.taskList.sort((a, b) => a.isDone === b.isDone ? 0 : (b.isDone ? -1 : 1));
  }
}
