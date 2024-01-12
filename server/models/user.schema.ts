import { defineMongooseModel } from '#nuxt/mongoose'

export const UserSchema = defineMongooseModel({
  name: 'User',
  schema: {
    name: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true,
    },
    score: {
      type: 'number',
      required: true,
    },
    created_date: {
      type: 'object',

      required: true,
    },
    updated_date: {
      type: 'object',

      required: true,
    },
    // slug: {
    //   type: 'string',
    //   required: true,
    //   unique: true,
    // },
  },
})
