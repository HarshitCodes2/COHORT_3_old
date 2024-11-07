import React, { Component } from 'react'

function Row(props){

  return (<>
    <tr>
      <td>{props.pet.petName}</td>
      <td>{props.pet.petType}</td>
      <td>{props.pet.breed}</td>
      <td>{props.pet.ownerName}</td>
      <td>{props.pet.email}</td>
      <td>{props.pet.phone}</td>
    </tr>
  </>)
}

export class AdopterData extends Component {

  constructor(props){
    super(props);
  }

  goBack = () => {
    this.props.setFormVisible(true);
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Pet Type</th>
              <th>Breed</th>
              <th>Adopter Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.pets.map((pet) => (
                <Row key={pet.key} pet={pet}/>
              ))
            }
          </tbody>
        </table>

        <button style={{width:"15%"}} onClick={this.goBack}>Go Back</button>
      </div>
      // Has a go back button
    )
  }
}

export default AdopterData