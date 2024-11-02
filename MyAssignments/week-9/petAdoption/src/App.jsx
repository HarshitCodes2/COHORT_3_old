import AdopterData from './components/AdopterData';
import Header from './components/Header';
import PetAdoptionForm from './components/PetAdoptionForm';
import "./myApp.css";
import { useEffect, useState } from 'react';


const App = () => {
  const [pets, setPets] = useState([]);
  const [formVisible, setFormVisible] = useState(true);
  const [petKey, setPetKey] = useState(1);

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80')",
        height: "100%",
        minHeight:"100vh",
        backgroundSize: "cover"
      }}
    >

      <Header message={"Pet Adoption Form"}/>
      { formVisible == true ? <PetAdoptionForm pets={pets} setPets={setPets} setFormVisible={setFormVisible} petKey={petKey} setPetKey={setPetKey}/> : null}
      { formVisible == false ? <AdopterData pets={pets} setFormVisible={setFormVisible} formVisible={formVisible}/> : null}
    </div>
  );
};
export default App;
