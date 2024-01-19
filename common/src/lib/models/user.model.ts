import { Field, ObjectType, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { User as UserDB } from '@prisma/client';
import * as UUID from 'graphql-type-uuid';

@ObjectType()
export class User {
  @Field(() => UUID)
  id!: UserDB['id'];

  @Field(() => String, { nullable: true })
  name!: UserDB['name'];

  @Field(() => String)
  surname!: UserDB['surname'];

  @Field(() => String, { nullable: true })
  email!: UserDB['email'];

  @Field(() => Int, { nullable: true })
  salary!: UserDB['salary'];

  @Field(() => String, { nullable: true })
  personal_key!: UserDB['personal_key'];

  @Field(() => GraphQLISODateTime)
  created_at!: UserDB['created_at'];

  @Field(() => String)
  rank!: UserDB['rank'];

  @Field(() => String)
  login!: UserDB['login'];

  @Field(() => String)
  password!: UserDB['password'];

  @Field(() => String)
  role!: UserDB['role'];
}
