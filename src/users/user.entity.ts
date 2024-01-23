import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import { Report } from './../reports/report.entity';
// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`User created with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with id ${this.id} updated`);
  }

  @AfterRemove()
  logRemoval() {
    console.log(`User with id ${this.id} removed`);
  }
}
