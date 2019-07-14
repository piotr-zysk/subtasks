import { TaskItem } from './taskitem';

export class Task {
    id: number;
    title: string;
    done?: boolean;
    items: TaskItem[] = [];
}


