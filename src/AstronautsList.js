import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faXmark } from '@fortawesome/free-solid-svg-icons'


export default function AstronautsList(props) {
    return (
        <div>
            <table className="astro-table">
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Date of birth
                        </th>
                        <th>
                            Superpower
                        </th>
                        <th >
                            Edit
                        </th>
                        <th>
                            Remove
                        </th>
                    </tr>

                </thead>
                <tbody>
                    {props.astronauts.map((astronaut => (
                        <tr key={astronaut.id}>
                            <td>
                                {astronaut.name}
                            </td>
                            <td>{astronaut.dateOfBirth}</td>
                            <td>{astronaut.superPower}</td>
                            <td>
                                <button type="button" className="edit-button" onClick={() => props.onEditChange(astronaut.id)}>
                                    <FontAwesomeIcon icon={faPenFancy} />
                                    <span className="sr-only">Edit data about {astronaut.name}</span>
                                </button>
                            </td>
                            <td>
                                <button type="button" className="remove-button" onClick={() => props.onDeleteChange(astronaut.id)}>
                                <FontAwesomeIcon icon={faXmark} />
                                    <span className="sr-only">Remove data about {astronaut.name}</span>
                                </button>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </div>
    )
}
 