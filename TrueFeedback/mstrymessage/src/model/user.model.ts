import mongoose, {Schema, Document} from "mongoose";
export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
   content:{
    type: String,
    required: true
   },
    createdAt:{
     type: Date,
     required: true,
     default: Date.now
    }
});

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAccpetingMessages: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username:{
     type: String,
     required: [true, "Username is required"],
     trim: true,
     unique: true
    },
     email:{
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match:[/.+\@.+\..+/, 'please use a valid email'],
      password:{
         type: String,
         required: [true, "Password is required"],
         minlength: 6
        },
        verifyCode:{
            type: String,
            required: [true, "Verification code is required"]
        },
        verifyCodeExpiry:{
            type: Date,
            required: [true, "Verification code expiry is required"]
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        isAccceptingMessages:{
            type: Boolean,
            default: true
        },
        messages:[MessageSchema]
     }
 });

 const UserModel = (mongoose.models.user as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

 export default UserModel;