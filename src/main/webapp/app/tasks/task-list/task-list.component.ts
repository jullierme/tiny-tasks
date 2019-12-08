import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Task} from '../task';
import {TaskService} from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() markedDone: EventEmitter<string> = new EventEmitter();
  @Output() deletedDone: EventEmitter<void> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  markAsDone(task: Task): void {
    this.taskService.markAsDone(task.id).subscribe(() => {
      this.markedDone.emit(task.id);
    });
  }

  deleteAllDone():void {
    this.taskService.deleteAllDone().subscribe(() => {
      this.deletedDone.emit();
    });
  }
}
