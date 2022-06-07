import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faXmark } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export default function AstronautsList(props: any) {
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
                <TransitionGroup component="tbody">
                    {props.astronauts.map((astronaut => (
                         <CSSTransition key={astronaut.id} timeout={700} classNames="item">
                        <tr key={astronaut.id}>
                            <td>
                                {astronaut.name}
                            </td>
                            <td>{astronaut.birthDate}</td>
                            <td>{astronaut.superpower}</td>
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
                        </CSSTransition>
                    )))}
                    
                </TransitionGroup>
            </table>
        </div>
    )
}
 