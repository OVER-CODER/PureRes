import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema";


export async function POSt(request: Request){
    await dbConnect()

    try {
        const {username, code} = await request.json()
        const decodedUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username: decodedUsername})

        if(!user){
            return Response.json(
                {
                    success: false,
                     message: "User not found"
                },
                {status: 500}
            )
        }

        const isCodeValid = user.verifyCode === code

        const isCodeNotExpiry = new Date(user.verifyCodeExpiry) > new Date()
        
        if(isCodeValid && isCodeNotExpiry){
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    success: true,
                    message: "User verified successfully"
                },
                {status: 200}
            )
        }else if(!isCodeNotExpiry){
            return Response.json(
                {
                    success: false,
                    message: "Verification Code has expired"
                },
                {status: 400}
            )

        }else {
            return Response.json(
                {
                    success: false,
                    message: "Invalid verification code"
                },
                {status: 400}
            )
        }
    } catch (error) {
        console.error("Error checking username",error)
        return Response.json(
            {
                success: false,
                message: "Error checking username"
            },
            {status: 500}
        )
    }
}