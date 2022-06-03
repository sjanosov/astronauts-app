import React from 'react'

function AddAstronautForm(props) {

    return (
        <div className="astro-form">
            <h2>Add a new brave astronaut</h2>
            <form onSubmit={props.onSubmit}>
                <label htmlFor="name">
                    Name:
                    <input
                        id="name" 
                        type="text" 
                        name="name" 
                        required
                        value={props.name} 
                        onChange={props.onNameChange} />
                </label>
                <label htmlFor="superpower">
                    Superpower:
                    <input 
                    id="superpower" 
                    type="text" 
                    name="superpower" 
                    required
                    value={props.superpower} 
                    onChange={props.onSuperpowerChange} />
                </label>
                <label htmlFor="birth">
                    Date of birth:
                    <input 
                    id="birth" 
                    type="date" 
                    name="birth" 
                    required
                    value={props.birthDate} 
                    onChange={props.onBirthDateChange} />
                </label>
                <input 
                type="submit" 
                value="Submit" 
                disabled={props.disabled} />
            </form>
        </div>
    )
}

export default AddAstronautForm