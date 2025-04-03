import { Task } from '../model/task.model';

export const sortByCreatedAtDesc = (items: Task[]): Task[] => {
  return items.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};
