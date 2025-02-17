import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Itinerary {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;
}
