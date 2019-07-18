import { TaskItem } from './taskitem';

export class Task {
    id: number;
    title: string;
    done?: boolean;
    items: TaskItem[] = [];

    constructor() {
            this.id = 0;
            this.title = '';
            this.done = false;
            this.items = [ ];
    }
}


