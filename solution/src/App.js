import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
import "./App.css";
import { getLocations, isNameValid } from "./mock-api/apis";

function App() {
  const [name, setName] = useState("MockName");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [locations, setLocations] = useState([]);
  const [isValidName, setValidName] = useState(false);
  const [selectedDropDown, setSelectedDropDown] = useState("Select One");

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  const onInputChange = (event) => {
    event.preventDefault();
    isNameValid(name).then((isValid) => {
      if (!isValid) {
        setValidName(true);
      } else {
        setValidName(false);
        setName(event.target.value);
      }
    });
  };

  return (
    <div className="App">
      <div className="nameBlock">
        <label className="labels">Name </label>
        <InputGroup>
          <Input defaultValue={name} onChange={(e) => onInputChange(e)} />
        </InputGroup>
        {isValidName && <p className="nameErrorMsg">Name is invalid</p>}
      </div>
      <div className="locationBlock">
        <label className="labels">Location </label>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret size="md">
            {selectedDropDown}
          </DropdownToggle>
          <DropdownMenu>
            {locations.map((location, id) => {
              return (
                <DropdownItem
                  key={id}
                  onClick={(e) =>
                    setSelectedDropDown(e.currentTarget.textContent)
                  }
                >
                  {location}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="buttonsBlock">
        <Button>Add</Button>
        <div className="clearButton">
          <Button>Clear</Button>
        </div>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>China</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>USA</td>
          </tr>
          <tr>
            <td>Larry</td>
            <td>Brazil</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default App;
