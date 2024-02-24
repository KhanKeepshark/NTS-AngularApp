interface ITodo {
  id: number;
  text: string;
}

export interface ITodosDataModel {
  [key: string]: ITodo[];
}
