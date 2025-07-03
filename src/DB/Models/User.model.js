import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
      trim: true,
      validate: {
        validator: function (value) {
          return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
        },
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (value) {
          return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
            value
          );
        },
      },
    },
    phone: {
      type: String,
      unique: [true, "Phone number already exists"],
      trim: true,
    },
    age: {
      type: Number,
      min: [15, "Age must be at least 15"],
    },
    otp: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 6,
      match: [/^\d{6}$/, "OTP must be a 6-digit number"],
    },
    role: {
      type: String,
    },
    profileImg: {
      type: String,
      isdeleted: {
        type: Boolean,
        default: false,
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
