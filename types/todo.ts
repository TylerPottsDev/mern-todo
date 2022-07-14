export interface ITodo {
  text: string;
  complete: boolean;
  timestamp:  string |  Date;
}

export interface ICreateTodoDTO {
  text: string;
}