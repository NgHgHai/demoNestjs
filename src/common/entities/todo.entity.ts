import { BaseEntity } from './base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'Todos' })
export class TodoEntity extends BaseEntity {

  @PrimaryGeneratedColumn({ name: 'todo_id', type: 'int' })
  id: number;

  @Column({ name: "user_id", type: "int", nullable: false })
  userId: number;

  @Column({ name: "title", length: 50, nullable: false })
  title: string;

  @Column({ name: "description", length: 500, nullable: true })
  description: string;

  @Column({ name: "is_completed", type: "bit", default: false })
  isCompleted: boolean;

  @Column({ name: 'due_time', type: 'date', nullable: true })
  dueTime: Date;

  @Column({ name: 'status', type: 'int', nullable: false })
  status: number;

  @Column({ name: 'priority', type: 'int', nullable: false })
  priority: number;

}

