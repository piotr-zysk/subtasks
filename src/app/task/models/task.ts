export class TaskItem {
    id: number;
    title: string;
}


export class Task {
    id: number;
    title: string;
    items: TaskItem[] = [];
}


