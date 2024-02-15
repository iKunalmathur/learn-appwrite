import { useState } from 'react'
import authService from '../appwrite/authService'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import Button from './Button'
import Logo from './Logo'
import Input from './Input'

export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const [ error, setError ] = useState('')

    const onSubmit = async (data) => {
        setError('')
        try {
            const authUser = await authService.login({
                email: data.email,
                password: data.password,
            })
            if (authUser) {
                const currentUser = await authService.getCurrentUser()
                console.log({ authUser, currentUser });
                if (currentUser) dispatch(login(currentUser))
                navigate('/')
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Logo />
            </div>
            <div className="text-red-500">
                {error && <p>{error}</p>}
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
                <Button type='submit'>Login</Button>
            </div>
            <div>
                <p>
                    {"Don't"} have an account? <Link to='/signup' className='text-blue-500'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </form>
    )
}