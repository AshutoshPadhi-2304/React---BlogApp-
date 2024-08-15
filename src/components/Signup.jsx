import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'
import {Input, Button, Logo} from './index.js'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit}= useForm()

    const registerUser = async(data) => {
        setError("")

        
        try {
            const newUser = await authService.create(data)
            if(newUser){
                const userData = await authService.getCurrentUser(newUser)

                if(userData) dispatch(storeLogin(userData))
                
                navigate("/")
            }
        } catch (error) {          
            setError(error.messsage)
        }
    }
    return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Create a New Account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(registerUser)}>
                <div className='space-y-5'>
                    <Input 
                        type = "text"
                        placeHolder = "Enter your Full Name"
                        label = "Name: "
                        {...register("name", {
                            required : true
                        })}
                    />
                    <Input
                        type = "email"
                        placeHolder = "Enter your Email"
                        label = "Email"
                        {...register("email", {
                            required : true,
                            validate : {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input 
                        type = "password"
                        placeHolder = "Enter your password"
                        label = "Password"
                        {...register("password", {
                            required : true
                        })}
                    />
                    <Button
                        type = "submit"
                        className="w-full"
                        onClick = {() => console.log("Button chal raha hai")}
                    >Sign Up</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup