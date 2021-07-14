import { NonEmptyArray } from 'type-graphql'
import UserResolver from './user'
const resolvers = [UserResolver] as NonEmptyArray<Function>
export default resolvers
