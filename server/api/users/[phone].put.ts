export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    try {
      return await UserSchema.findOneAndUpdate({ phone: event.context.params?.phone }, body, { new: true })
    }
    catch (error) {
      return error
    }
  })
  