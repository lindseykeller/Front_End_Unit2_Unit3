import React, {useState} from "react";
import axios from "axios";
import {GlobalContext} from "../context/GlobalContext";


export default function Form({role, history}) {
    const {setLoggedIn} = React.useContext(GlobalContext);

    const [authInfo, setAuthInfo] = useState( {
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        terms:false,
    })
    const[disabledButton,setDisabledButton] = useState(true)

    const[errors,setErrors] = useState({
        name:'',
        email:'',
        userName:'',
        password:'',
        confirmPassword:'',
        terms:'',
    })

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is a required field').min(2,'minimum two characters'),
        email: yup.string().email('enter a valid email').required('email is required field'),
        userName: yup.string().required('Must choose a user name').min(4,'minimum four characters'),
        password: yup.string().required("Please enter your password.").min(6), /*matches(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character")*/
        confirmPassword: yup.string().matches([user.password],'Passwords must match'),
        terms: yup.boolean().oneOf([true],'please agree the terms'),
    })

    // check the validity of input
  

    const validateInput = event=>{
        yup
        .reach(formSchema,event.target.name)
        .validate(event.target.type==='checkbox'?event.target.checked:event.target.value)
        .then(valid=>{
            setErrors(
                {...errors,[event.target.name]:''
            })
        })
        .catch(err=>{
            setErrors(
                {...errors,[event.target.name]:err.errors[0]
            })
        })

    }
    useEffect(()=>{
        formSchema
        .isValid(authInfo)
        .then(valid=>{
            setDisabledButton(!valid)
        })

    },[authInfo])

    const handleChange = e => {
        setAuthInfo({
            ...authInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';


const Group = styled.div`
display:block`


export default function SignUpForm({history}) {
    const {setLoggedIn} = React.useContext(GlobalContext);

    const [userInfo, setuserInfo] = useState( {
        name:'',
        email:'',
        address:'',
        phone: '',
        password:'',
        confirmPassword:'',
        terms:false,
    })

    const handleChange = e => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //make two forms? or use param in endpoint?
        

        axios.post( `https://better-professor-build-week.herokuapp.com/auth/register`, userInfo)

            .then(res => {
                console.log(res)
                    setLoggedIn(true);

                    history.push('/login')

            })
            .catch(err => console.log(err.message))
    }


    return(
        <div className='form-container'>
        <div className='navs'>
           <Link to = '/marketingPage'>Home</Link>
       </div>
       <h1>Welcome to How Tos Registration Form</h1>
       <form onSubmit={handleSubmit}>
           <Group>
               <label htmlFor='name'>Name</label>
               <input type='text' id='name' name ='name' value={authInfo.name} onChange={handleChange}/>
               {errors.name.length>0?<p className='error'>{errors.name}</p>:null}
            
           </Group>
           <Group>
               <label htmlFor='email'>Email</label>
               <input type='email' id='email' name ='email' value={authInfo.email} onChange={handleChange}/>
               {errors.email.length>0?<p className='error'>{errors.email}</p>:null}
           </Group>
           <Group>
               <label htmlFor='userName'>User Name</label>
               <input type='text' id='userName' name ='userName' value={authInfo.userName} onChange={handleChange}/>
               {errors.userName.length>0?<p className='error'>{errors.userName}</p>:null}
           </Group>
           <Group>
               <label htmlFor='password'>Password</label>
               <input type='text' id='password' name ='password' value={authInfo.password} onChange={handleChange}/>
               {errors.password.length>0?<p className='error'>{errors.password}</p>:null}
           </Group>
           <Group>
               <label htmlFor='confirmPassword'>Confirm Password</label>
               <input type='text' id='confirmPassword' name ='confirmPassword' value={authInfo.confirmPassword} onChange={handleChange}/>
               {errors.confirmPassword.length>0?<p className='error'>{errors.confirmPassword}</p>:null}
           </Group>
           <Group>
               <label htmlFor='terms'>Please agree to the terms</label>
               <input type='checkbox' id='terms' name ='terms' checked={authInfo.terms} onChange={handleChange}/>
               {errors.terms.length>0?<p className='error'>{errors.terms}</p>:null}
           </Group>

          <button disabled={disabledButton} > sign up </button>
           

       </form>
       <div className='button-container'>
           <span><Link to ='/'>Log in</Link> if you have an count</span>
          
       </div>
   </div>
  

    const formSchema = yup.object().shape({
        name: yup.string().required('Name is a required field').min(2,'minimum two characters'),
        email: yup.string().email('enter a valid email').required('email is required field'),
        userName: yup.string().required('Must choose a user name').min(4,'minimum four characters'),
        password: yup.string().required("Please enter your password.").min(6), /*matches(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character")*/
        confirmPassword: yup.string().matches([userInfo.password],'Passwords must match'),
        terms: yup.boolean().oneOf([true],'please agree the terms'),
    })

    // check the validity of input
  
    ///******This was the question about validation and auth, use this? or axiosWithAuth? or is  utils > Axioswithauth code wrong?*************

    // const validateInput = event=>{
    //     yup
    //     .reach(formSchema,event.target.name)
    //     .validate(event.target.type==='checkbox'?event.target.checked:event.target.value)
    //     .then(valid=>{
    //         setErrors(
    //             {...errors,[event.target.name]:''
    //         })
    //     })
    //     .catch(err=>{
    //         setErrors(
    //             {...errors,[event.target.name]:err.errors[0]
    //         })
    //     })


    return(
        <div className='form-container'>
            <form onsubit={handleSubmit}>
            <Group>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name ='name' value={userInfo.name} onChange={handleChange}/>
                    {errors.name.length>0?<p className='error'>{errors.name}</p>:null}
                 
                </Group>
                <Group>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name ='email' value={userInfo.email} onChange={handleChange}/>
                    {errors.email.length>0?<p className='error'>{errors.email}</p>:null}
                </Group>
                <Group>
                    <label htmlFor='userName'>User Name</label>
                    <input type='text' id='userName' name ='userName' value={userInfo.userName} onChange={handleChange}/>
                    {errors.userName.length>0?<p className='error'>{errors.userName}</p>:null}
                </Group>
                <Group>
                    <label htmlFor='password'>Password</label>
                    <input type='text' id='password' name ='password' value={userInfo.password} onChange={handleChange}/>
                    {errors.password.length>0?<p className='error'>{errors.password}</p>:null}
                </Group>
                <Group>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='text' id='confirmPassword' name ='confirmPassword' value={userInfo.confirmPassword} onChange={handleChange}/>
                    {errors.confirmPassword.length>0?<p className='error'>{errors.confirmPassword}</p>:null}
                </Group>
                <Group>
                    <label htmlFor='terms'>Please agree to the terms</label>
                    <input type='checkbox' id='terms' name ='terms' checked={userInfo.terms} onChange={handleChange}/>
                    {errors.terms.length>0?<p className='error'>{errors.terms}</p>:null}
                </Group>

                
                <button>Sign Up</button>
         

            </form>
            {/* <span> If you don't have acoount register here <button>sign up </button></span>  */}
            </div>

    )
}
