import React, { useEffect, useState } from 'react';
import { validation } from '../utils/validation';

const PetAdoptionForm = (props) => {
  const [inputs, setInputs] = useState({
    petName: "",
    petType: "",
    breed: "",
    ownerName: "",
    email: "",
    phone: ""
  });
  const [err, setErr] = useState({
    petName: "",
    petType: "",
    breed: "",
    ownerName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    // Perform side effects based on changes to input values
    console.log("Inputs changed:", inputs);
  }, [inputs]);

  function updateInput(field, value) {
    setInputs(prevInputs => ({
      ...prevInputs,
      [field]: value
    }));

    // Validate the input and update the error state
    const validationErrors = validation(field, value, err);
    setErr(validationErrors);
    // console.log(err);
  }

  function submitForm() {
    const { petName, petType, breed, ownerName, email, phone } = inputs;

    // Perform form submission logic here
    console.log("Form submitted with values:", { petName, petType, breed, ownerName, email, phone });
    props.setPets([...props.pets,{
      key: props.petKey,
      petName: petName,
      petType: petType,
      breed: breed,
      ownerName: ownerName,
      email: email,
      phone: phone
    }]);

    // Reset form and hide it
    props.setPetKey(props.petKey + 1);
    props.setFormVisible(false);
  }

  return (
    <div>
      <div className='form'>
        <form onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
          <label>Pet Name</label>
          <input
            onChange={(e) => updateInput('petName', e.target.value)}
            id='petName'
            type='text'
            placeholder='Pet Name'
          />
          <small>{err.petName}</small>

          <label>Pet Type</label>
          <select
            id="petType"
            name="petType"
            onChange={(e) => updateInput('petType', e.target.value)}
          >
            <option value="">Select Pet Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
          </select>
          <small>{err.petType}</small>

          <label>Breed</label>
          <input
            onChange={(e) => updateInput('breed', e.target.value)}
            id='breed'
            type='text'
            placeholder='Breed'
          />
          <small>{err.breed}</small>

          <label>Your Name</label>
          <input
            onChange={(e) => updateInput('ownerName', e.target.value)}
            id='ownerName'
            type='text'
            placeholder='Your Name'
          />
          <small>{err.ownerName}</small>

          <label>Email</label>
          <input
            onChange={(e) => updateInput('email', e.target.value)}
            id='email'
            type='email'
            placeholder='Email'
          />
          <small>{err.email}</small>

          <label>Phone</label>
          <input
            onChange={(e) => updateInput('phone', e.target.value)}
            id='phone'
            type='text'
            placeholder='Phone'
          />
          <small>{err.phone}</small>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PetAdoptionForm;