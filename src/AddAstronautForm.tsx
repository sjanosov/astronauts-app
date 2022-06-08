import React, { ChangeEventHandler, FormEventHandler } from 'react'

export type AddAstronautFormProps = {
    
    onSubmit: FormEventHandler<HTMLFormElement>;
    onNameChange: ChangeEventHandler<HTMLInputElement>;
    name: string;
    superpower: string;
    onSuperpowerChange: ChangeEventHandler<HTMLInputElement>;
    birthDate: string;
    onBirthDateChange: ChangeEventHandler<HTMLInputElement>;
    isPending: boolean;
    disabled: boolean;
}

function AddAstronautForm(props:AddAstronautFormProps) {
    

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
                {props.isPending ?
                    <input
                        type="submit"
                        value="Submiting..."
                        disabled /> :
                    <input
                        type="submit"
                        value="Submit"
                    />}

            </form>
        </div>
    )
}

export default AddAstronautForm