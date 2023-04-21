import './styles/login.css'
import { SignUp } from '../../componets/SignUp/SignUp'
import { SignIn } from '../../componets/SignIn/SignIn'
import { useState } from 'react'




export const Login = () => {
    const [hidden, setHidden] = useState(true)

    const clickHandler = (hidden) => {
        setHidden(!hidden)
    }

    // signInBtn.addEventListener("click", () => {  
//      container.classList.remove("right-panel-active");  
// });  
// signUpBtn.addEventListener("click", () => {  
//      container.classList.add("right-panel-active");  
// });  
// fistForm.addEventListener("submit", (e) => e.preventDefault());  
// secondForm.addEventListener("submit", (e) => e.preventDefault());

    return (
        <div class="container right-panel-active">
            <SignUp hidden={hidden}/>
            <SignIn hidden={!hidden}/>
            <div class="container__overlay">
                <div class="overlay">
                    <div class="overlay__panel overlay--left">
                        <button class="btn" id="signIn" onClick={() => clickHandler()}>Sign In</button>
                    </div>
                    <div class="overlay__panel overlay--right">
                        <button class="btn" id="signUp" onClick={() => clickHandler()}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}