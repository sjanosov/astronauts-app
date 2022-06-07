import React from 'react'

function EditAstronautForm(props) {

    return (
        <div className="astro-form">
            <h2>Edit a brave astronaut</h2>
            <form onSubmit={props.onSubmit}>
                <label htmlFor="name">
                    Name:
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder={props.name}
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

export default EditAstronautForm