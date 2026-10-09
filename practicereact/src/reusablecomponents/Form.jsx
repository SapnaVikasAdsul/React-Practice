import { useState } from 'react'
import Input from './Input'

function Form() {
    const [email, setEmail] = useState('')

    return (
        <div>
            <Input
                label="Email"
                type="email"
                placeholder="Enter the value"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
    )
}

export default Form
