export default defineEventHandler(async (event) => {
    try {
      // return await UserSchema.findOne({ _id: event.context.params?._id })
      return await UserSchema.findOne({ phone: event.context.params?.phone })
    }
    catch (error) {
      return error
    }
  })
  