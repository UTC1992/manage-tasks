import { Task } from '../model/task.model';

export const sortByCreatedAtAsc = (items: Task[]): Task[] => {
  return items.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};
