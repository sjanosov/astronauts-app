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
    isEditing: boolean;
}

function AddAstronautForm(props:AddAstronautFormProps) {
    
    let today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    let todayString = today.toISOString().split('T')[0];

    return (
        <div className="astro-form">
            {props.isEditing ? <h2>Edit the astronaut</h2> : <h2>Add a new brave astronaut</h2>}
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
                        max={todayString}
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