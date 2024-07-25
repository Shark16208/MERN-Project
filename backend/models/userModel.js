/* file that sets up model/structure of the data in the database. Specifies  */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// main outline of the data and types listed for each input in database
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniques: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/*before saving any inputed data to the database, check if the password is just created or modified.
If it has not been just created or modified, hash the password and then store it. */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // hash plaintext using bcrypt. "Salt" contains hash specifications, "this.password" is plaintext
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// database is created and named based on the above schema/model
const User = mongoose.model("User", userSchema);

export default User;
