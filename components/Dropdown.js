import { Button,Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Location from "./Location";

export default function Dropdownf({setLo}) {
    const map1 = Location.map(x => 
        <Dropdown.Item         

        onClick={()=> setLo(x)}>{x.locate}</Dropdown.Item>
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
                            "max-height": "700px",
                            "overflowY": "auto",
                        }}>
                    {map1}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}