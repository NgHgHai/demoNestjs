import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'getdate()',
  })
  createdAt: Date;

  @Column({
    name: 'created_by',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  createdBy: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  updatedBy: string;

  @Column({
    name: 'deleted_at',
    type: 'datetime',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    name: 'deleted_by',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  deletedBy: string;

  @Column({
    name: 'deleted',
    type: 'bit',
    nullable: true,
    default: false,
  })
  deleted: boolean;
}
