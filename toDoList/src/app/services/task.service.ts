import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Task} from '../shared/Task.interface';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public addTask(newTask: Task): Observable<any> {
    return this.http.post(this.BASE_URL + '/tasks', newTask);
  }

  public getAllTasks(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + '/tasks')
      .pipe(map((item) => {
        return item.tasks.map((task: any) => {
          return {
            id: task._id,
            body: task.body,
            isDone: task.isDone,
            deadline: task.deadline
          }
        })
      }));
  }

  public deleteTask(id: string): Observable<any> {
    return this.http.delete(this.BASE_URL + '/tasks/' + id);
  }

  public updateTask(taskData: Task): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(this.BASE_URL + '/tasks', taskData);
  }
}
