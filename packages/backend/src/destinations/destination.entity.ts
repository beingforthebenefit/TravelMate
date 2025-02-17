import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Destination {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  createdAt: Date;
}
