export interface Task {
  id?: string;
  body: string;
  deadline: string | Date;
  isDone: boolean;
}
