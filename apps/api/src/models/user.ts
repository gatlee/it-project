import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  email: String,
  passwordHash: String,
  name: String,
  dateJoined: Date,
});

export default mongoose.model('User', userSchema);
