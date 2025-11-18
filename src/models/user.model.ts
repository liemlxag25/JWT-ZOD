import mongoose, { Schema, Document, Types } from "mongoose";


export interface IUser extends Document {
  id:string;
  username: string;
  password: string;
  role?: string;       
  _id: Types.ObjectId;   
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },  
  },
  { timestamps: true }
);


export default mongoose.model<IUser>("User", userSchema);
