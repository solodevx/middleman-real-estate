import mongoose from "mongoose";

// Note: Better Auth manages its own user records automatically.
// This model is for any EXTRA fields we want to store per admin
// that Better Auth doesn't handle by default — like role.

const userSchema = new mongoose.Schema(
  {
    // This links our record to Better Auth's user record
    betterAuthId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
