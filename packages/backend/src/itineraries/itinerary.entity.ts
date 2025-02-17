import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Itinerary {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  createdAt: Date;
}
