import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";


export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    birthday: "",
    gender: "",
    job: "",
    workPlace: "",
    howFound: "",
    address: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
    birthday: "",
    gender: "",
    job: "",
    workPlace: "",
    howFound: "",
    address: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: ""
      });
    }
  };

  const handleDateChange = (e) => {
    
    const isoDate = e.target.value;

    const dateOnly = isoDate.split('T')[0];
    setEventDate(dateOnly);
  }

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validaciones según los requisitos del DTO
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
      isValid = false;
    } else if (formData.name.length > 50) {
      newErrors.name = "El nombre no puede tener más de 50 caracteres";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Los apellidos son obligatorios";
      isValid = false;
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = "Los apellidos no pueden tener más de 50 caracteres";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "El teléfono solo puede contener números.";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      isValid = false;
    }

    if (formData.password !== formData.rePassword) {
      newErrors.rePassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    if (!formData.birthday) {
      newErrors.birthday = "La fecha de nacimiento es obligatoria";
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "El género es obligatorio";
      isValid = false;
    }

    if (!formData.job) {
      newErrors.job = "La profesión es obligatoria";
      isValid = false;
    }

    if (!formData.workPlace) {
      newErrors.workPlace = "El lugar de trabajo es obligatorio";
      isValid = false;
    }

    if (!formData.howFound) {
      newErrors.howFound = "Debes indicar cómo te enteraste";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/user/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          gender: userData.gender,
          birthday: userData.birthday,
          job: userData.job,
          workPlace: userData.workPlace,
          howFound: userData.howFound,
          address: userData.address || "No especificado"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUser(formData);
      console.log("Usuario registrado:", response);
      alert("Usuario registrado exitosamente");

      // Limpiar formulario
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
        birthday: "",
        gender: "",
        job: "",
        workPlace: "",
        howFound: "",
        address: ""
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(error.message || "Ocurrió un error al registrar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        
      </div>
    </div>
  );
}
