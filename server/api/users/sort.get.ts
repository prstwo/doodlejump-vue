export default defineEventHandler(async (event) => {
    try {
      return await UserSchema.find().sort({score:-1}).limit(3).select('-phone')  
    }
    catch (error) {
      return error
    }
  })
  