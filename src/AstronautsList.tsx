import React from 'react'
import { TransitionGroup } from 'react-transition-group';
import Astronaut from './Astronaut';
import { AstronautType } from './types/AstronautType';

export type AstronautsListProps = {
    onDeleteChange: Function;
    onEditChange: Function;
    astronauts: AstronautType[];
}

export default function AstronautsList(props: AstronautsListProps) {
    return (
        <div>
            <TransitionGroup component="table" className="astro-table">
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
                    <Astronaut astronauts={props.astronauts} onDeleteChange={props.onDeleteChange} onEditChange={props.onEditChange}/>
                </tbody>
            </TransitionGroup>
        </div>
    )
}
 