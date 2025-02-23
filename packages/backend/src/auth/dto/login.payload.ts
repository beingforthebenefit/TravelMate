import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/user.entity';

@ObjectType()
export class LoginPayload {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
