import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`User created with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate(){
    console.log(`User with id ${this.id} updated`);
  }

  @AfterRemove()
  logRemoval(){
    console.log(`User with id ${this.id} removed`);
  }
}
