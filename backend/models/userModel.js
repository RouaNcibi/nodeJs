import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = mongoose.Schema({
    name: { type: String, required: [true, "Please add a name"] },
    email: { type: String, required: [true, "Please add an email"], unique: true },
    password: { type: String, required: [true, "Please add a password"] },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

// Hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate and set password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash the token and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    // Set token expiry to 10 minutes
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
