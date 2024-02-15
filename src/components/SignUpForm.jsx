import React, { useState } from 'react'
import authService from '../appwrite/authService'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'

export default function SignUpForm() {
    const [ error, setError ] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        setError('')
        try {
            const newUser = await authService.createAccount({
                email: data.email,
                password: data.password,
                name: data.name
            })

            if (newUser) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) dispatch(login(currentUser))
                navigate('/')
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Logo />
                </div>
                <div className="text-red-500">
                    {error && <p>{error}</p>}
                </div>
                <div>
                    <Input
                        label="Name"
                        placeholder="Enter your name"
                        {...register('name', { required: true })}
                    />
                </div>
                <div>
                    <Input
                        label="Email"
                        type='email'
                        placeholder="Enter your email"
                        {...register('email', { required: true })}
                    />
                </div>
                <div>
                    <Input
                        label="Password"
                        type='password'
                        placeholder="Enter your password"
                        {...register('password', { required: true })}
                    />
                </div>
                <div>
                    <Button type='submit'>Sign Up</Button>
                </div>
                <div>
                    <p>
                        Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </div>
            </form>
        </>
    )
}
