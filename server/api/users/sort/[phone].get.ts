export default defineEventHandler(async (event) => {
    try {
      const users = await UserSchema.find().sort({ score: -1 }).exec();
      
      // Find the index of the user with the specified phone number
      const userIndex = users.findIndex(user => user.phone === event.context.params?.phone);
  
      return userIndex;
    } catch (error) {
      return error;
    }
  });
  