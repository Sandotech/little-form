import React from 'react'
import { useForm } from "react-hook-form";
import ageValidator from '../validators';

const Form  = () => {
    const { register, handleSubmit, formState: {errors}, watch } = useForm({
        defaultValues: {
            firstName: '',
            lastName: ''
        }
    });
    const addPhoneNumber = watch('addPhoneNumber')
    return(
        <form onSubmit={handleSubmit((data) => {
            (data) ? console.log(data) : console.log(errors)
        })}
        >   <div>
                {<p>Hello {watch('firstName')}</p>}
                <label>What is your first name?</label>
                <input { ...register('firstName', {
                    required: true,
                    minLength: {
                        value: 4,
                        message: 'This name should contain more than 3 letters'
                    }
                })} placeholder='First Name' />
                {errors.firstName?.type === 'required' && <p>Do not Forget put your name here :D</p>}
            </div>
            {/* last name */}
            <div>
                <label>and your last name is?</label>
                <input { ...register('lastName', {
                    required: true
                }) } placeholder='Last Name' />
            </div>
            {/* email */}
            <div>
                <label>Your email here</label>
                <input type='email' { ...register('email', {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                }) } placeholder='email' />
                {errors.email?.type === 'pattern' && <p>The email format in wrong</p>}
            </div>
            {/* age */}
            <div>
                <label>How old are you?</label>
                <input type='number' { ...register('age', {
                    required: true,
                    validate: ageValidator
                }) } placeholder='y/o' />
                {errors.age && <p>The age must be between 18 and 65</p>}
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <select name="country" id="country" { ...register('country') }>
                    <option value="SP">Spain</option>
                    <option value="MX">Mexico</option>
                    <option value="CO">Colombia</option>
                    <option value="VE">Venezuela</option>
                </select>
            </div>
            <section>
                <div>
                    <label htmlFor="addPhoneNumber">Add Phone Number?</label>
                    <input type="checkbox" name="add phone number" id="addPhoneNumber" {...register('addPhoneNumber')} />
                </div>
                {addPhoneNumber && (
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" name="phone number" id="phoneNumber" {...register('phoneNumber')} />
                </div>
                )}
            </section>
            <input type='submit' value='Send request' />
        </form>
    )
}

export default Form 