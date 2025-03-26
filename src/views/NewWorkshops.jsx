import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import InputComponent from "../components/InputComponent";
import BlueButton from "../components/BlueButton";
import SelectInputComponent from "../components/SelectInput.Component";


import passwordIcon from '../assets/icons/llave.png'
import cellphone from '../assets/icons/telefono-inteligente.png';
import sobre from '../assets/icons/sobres.png';
import userIcon from '../assets/icons/usuario.png';

export default function NewWorkshop() {

  {/*Temporal para vizualizar */}
 const [selectedOption, setSelectedOption] = React.useState("");
  const options = [
    { value: "op1", label: "Opción 1" },
    { value: "op2", label: "Opción 2" },
    { value: "op3", label: "Opción 3" },
];

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <div className="form">
                  <h1 className="text-center mb-4">Registrar taller</h1>
        
                  <form>
                    <div className="row">
                      {/* Primera columna */}
                      <div className="col-md-6">
                        <div className="form-block p-3">
                          <InputComponent
                            
                            type="text"
                            label={
                              <>
                                <img src={userIcon} alt="Icono" className="icon-sm" />
                                <span className="label-text">Nombre del taller</span>
                                <span className="required-asterisk">*</span>
                              </>
                            }
                            id="name"
                        
                          />
        
                        </div>
                      </div>
        
                      {/* Segunda columna */}
                      <div className="col-md-6">
                        <div className="form-block p-3">
                          <InputComponent
                            
                            type="text"
                            label={
                              <>
                                <img src={userIcon} alt="Icono" className="icon-sm" />
                                <span className="label-text">Nombre del ponente</span>
                                <span className="required-asterisk">*</span>
                              </>
                            }
                            id="speaker"
            
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* Primera columna */}
                      <div className="col-md-6">
                        <div className="form-block p-2">
                          <InputComponent
                            
                            type="text"
                            label={
                              <>
                                <img src={sobre} alt="Icono" className="icon-sm" />
                                <span className="label-text">Hora</span>
                                <span className="required-asterisk">*</span>
                              </>
                            }
                            id="time"
                            
                          />
                        </div>
                      </div>
        
                      {/* Segunda columna */}
                      <div className="col-md-6">
                        <div className="form-block p-2">
                          <div className="form-block p-2">
                            <InputComponent
                              
                              type="text"
                              label={
                                <>
                                  <img src={cellphone} alt="Icono" className="icon-sm" />
                                  <span className="label-text">Cupo</span>
                                  <span className="required-asterisk">*</span>
                                </>
                              }
                              id="quota"
                              
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <SelectInputComponent
                        options={options}
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        label="Elige una opción"
                        id="fromActivity"
                        placeholder="Selecciona un evento"
                      
                      />
                    </div>

                    <div className="row">
                      <InputComponent
                      type="text"
                      label={
                        <>
                          <img src={cellphone} alt="Icono" className="icon-sm" />
                          <span className="label-text">Descripción</span>
                          <span className="required-asterisk">*</span>
                        </>
                      }
                      id="quota"
                    
                    />
                    </div>
        
                    <div className="row">
        
                      <div className="col-md-9">
                        <div className="form-block p-2">
        
                        </div>
                      </div>
        
                      <div className="col-md-3">
                        <div className="form-block p-2">
                          <BlueButton type="submit">Registrar</BlueButton>
                        </div>
                      </div>
                    </div>
                  </form>
        
        
        
        
                </div>

      </div>
    </div>
  );
} 