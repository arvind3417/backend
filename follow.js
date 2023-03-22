const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.8unxxd0.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});

// Define a schema for the user
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Create a model from the schema
const User = mongoose.model('User2', userSchema);

// Function to follow a user
const followUser = async (followerId, followeeUsername) => {
  try {
    // Find the followee user
    const followee = await User.findOne({ username: followeeUsername });

    // If the followee user exists
    if (followee) {
      // Update the followers list of the followee user
      followee.followers.push(followerId);
      await followee.save();

      console.log(`User ${followerId} is now following ${followeeUsername}`);
    } else {
      console.log(`User ${followeeUsername} not found`);
    }
  } catch (err) {
    console.error(err);
  }
};

// Example usage
// followUser('63e1629146899753097e86e5', 'johndoe');
module.exports = followUser;
