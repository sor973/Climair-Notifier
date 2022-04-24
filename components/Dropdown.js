import { Button,Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Location from "./Location";
import uuid from "react-uuid"

export default function Dropdownf({setLo}) {
    const map1 = Location.map(x => 
        <div key={uuid()}>
            <Dropdown.Item onClick={()=> setLo(x)}>{x.locate}</Dropdown.Item>
        </div>
        )
    return (
        <div>
            <Dropdown        
>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Location
                </Dropdown.Toggle>

                <Dropdown.Menu
                        style = {{ 
                            "maxHeight": "460px",
                            "overflowY": "auto",
                        }}>
                    {map1}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}