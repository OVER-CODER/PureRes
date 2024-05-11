import dbConnect from "@/lib/dbConnect";

import UserModel from "@/model/user.model";
import { z } from "zod";

import { usernameValidation } from "@/schemas/signupSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
   1
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result)
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json(
                {
                    success: false,
                    message: usernameErrors?.length > 0 ? usernameErrors.join(',')
                    :"Invalid query parameters",
                },
                {status: 400}
            ) 
        }

        const {username} = result.data

        const existingVerifiendUser = await UserModel.findOne({username, isVerified: true})

        if(existingVerifiendUser){
            return Response.json(
                {
                    success: false,
                    message: "Username already taken"
                },
                {status: 400}
            )
        }
        return Response.json(
            {
                success: true,
                message: "Username is unique"
            },
            {status: 400}
        )
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