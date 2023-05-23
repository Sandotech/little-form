import React from 'react'
import { useForm } from "react-hook-form";
import ageValidator from '../validators';
import '../styles/Form.css'

const Form  = () => {
    const { register, handleSubmit, formState: {errors}, watch } = useForm({
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });
    const addPhoneNumber = watch('addPhoneNumber')
    return(
        <form className='form' onSubmit={handleSubmit((data) => {
            (data) ? console.log(data) : console.log(errors)
        })}>
            {<p classNmae='form--gretting'>Hello {watch('firstName')}!</p>}
            <section className='form--input-nested'> 
                <label className='form-title' htmlFor='firstName'>What is your first name?</label>
                <input className='form--input-blank' id='firstName' { ...register('firstName', {
                    required: true,
                    minLength: {
                        value: 4,
                        message: 'This name should contain more than 3 letters'
                    }
                })} placeholder='First Name' />
                {errors.firstName?.type === 'required' && <p className='form--error-messages'>Do not Forget put your name here :D</p>}
            </section>
            {/* last name */}
            <section className='form--input-nested'>
                <label className='form-title' htmlFor='lastName'>Your last name is?</label>
                <input className='form--input-blank' id='lastName' { ...register('lastName', {
                    required: true
                }) } placeholder='Last Name' />
            </section>
            {/* email */}
            <section className='form--input-nested'>
                <label className='form-title' htmlFor='email'>Your email here</label>
                <input className='form--input-blank' id='email' type='email' { ...register('email', {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                }) } placeholder='email' />
                {errors.email?.type === 'pattern' && <p className='form--error-messages'>The email format is wrong</p>}
            </section>
            {/* age */}
            <section className='form--input-nested'>
                <label className='form-title' htmlFor='age' >How old are you?</label>
                <input className='form--input-blank' id='age' type='number' { ...register('age', {
                    required: true,
                    validate: ageValidator
                }) } placeholder='y/o' />
                {errors.age && <p className='form--error-messages'>The age must be between 18 and 65</p>}
            </section>
            {/* country */}
            <section className='form-country-dropdown'>
                <label className='form--country' htmlFor="country">Country
                    <select name="country" id="country" { ...register('country') }>
                        <option value="SP">Spain</option>
                        <option value="MX">Mexico</option>
                        <option value="CO">Colombia</option>
                        <option value="VE">Venezuela</option>
                    </select>
                </label>
            </section>
            <section className='form--toggle-input'>
                <div className='form--toggle-check'>
                    <label className='form--toggle-title' htmlFor="addPhoneNumber">Add Phone Number?</label>
                    <input className='form--toggle-input' style={{backgroundColor: "#515866"}} type="checkbox" name="add phone number" id="addPhoneNumber" {...register('addPhoneNumber')} />
                </div>
                {addPhoneNumber && (
                <div className='form--phone-container'>
                    <label className='form--phone-title' htmlFor="phoneNumber">Phone Number</label>
                    <input className='form--input-blank' type="text" name="phone number" id="phoneNumber" {...register('phoneNumber')} />
                </div>
                )}
            </section>
            <input className='form--button-submit' type='submit' value='Submit' />
        </form>
    )
}

export default Form 