import React, { useRef, useState } from 'react'
import { checkEmailAndPassword } from '../utilities/validate';
import { signIn, signUp, signInWithGoogle} from '../utilities/auth';
import { useNavigate}  from 'react-router-dom';
import { useContext } from 'react';
import userContext from '../context/context';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();
    const Navigate = useNavigate();
    const {user, setUser} = useContext(userContext);

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp)
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        const message = checkEmailAndPassword(emailRef.current.value, passwordRef.current.value);
        setErrorMessage(message);
        if (message === null) {
            if (isSignUp) {
                // signUp(emailRef.current.value, passwordRef.current.value).then((res) => setErrorMessage(res));
                signUp(emailRef.current.value, passwordRef.current.value).then(() => Navigate('/'))
            } else {
                signIn(emailRef.current.value, passwordRef.current.value).then((user) => {setUser(user.email) ; Navigate('/dashboard')});
            }
        }
    }

    const handleButtonClickV2 = (e) => {
        e.preventDefault();
        signInWithGoogle().then((res) => setErrorMessage(res)).then(() => Navigate('/dashboard'));
    }
    return (
        <div>
            <form className='absolute w-1/2 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-md bg-opacity-75'>
                <h1 className='font-bold text-3xl py-4'>{isSignUp ? "Sign Up" : "Sign In"}</h1>
                {isSignUp && (<input ref={nameRef} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />)}
                <input ref={emailRef} type='text' placeholder='Email or Mobile Number' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
                <input ref={passwordRef} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
                {errorMessage && (<p>{errorMessage}</p>)}
                <button className='p-4 my-6 w-full bg-red-700 rounded-lg' onClick={handleButtonClick}>{isSignUp ? "Sign Up" : "Sign In"}</button>
                { !isSignUp && (<button className='p-4 my-2 w-full bg-red-700 rounded-lg' onClick={handleButtonClickV2}>Sign In With Google</button>)}
                <p className='py-4'>{isSignUp ? "Already a User? " : "New User? "}<span className='font-bold' onClick={toggleSignUp}>{isSignUp ? "Sign In" : "Sign Up"}</span></p>
            </form>
        </div>
    )
}

export default Login
