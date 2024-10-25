"use client"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Test(){
    return(
        <div className='min-h-screen flex justify-center items-center'>
             
    <PhoneInput
    inputProps={{
        name: 'phone',
        required: true,
        autoFocus: true
    }}
    country={'us'}
  
//   value={this.state.phone}
//   onChange={phone => this.setState({ phone })}
/>
        </div>
       

    )
}