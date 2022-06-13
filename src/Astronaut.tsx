import React from 'react'
import { AstronautType } from './types/AstronautType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy, faXmark } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export type AstronautProps = {
    astronauts: AstronautType[];
    onEditChange: Function;
    onDeleteChange: Function; 
}

function Astronaut(props: AstronautProps) {
    return (
    <TransitionGroup component={null}>
            {props.astronauts.map(((astronaut: AstronautType) => (
                <CSSTransition
                    key={astronaut.id}
                    timeout={300}
                    classNames="item"
                >
                    <tr>
                        <td>
                            {astronaut.name}
                        </td>
                        <td>{astronaut.birthDate?.toString()}</td>
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
    )
}

export default Astronaut