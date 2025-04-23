import React, { useEffect, useState } from "react";
import CustomerRootHeader from "../components/CustomerRootHeader";
import AdminNav from "../components/AdminNav";
import BlueButton from "../components/BlueButton";
import PurpleButton from "../components/PurpleButton";
import ModalComponent from "../components/modals/ModalComponent";
import UpdateProfile from "../components/modals/UpdateProfile";
import UpdatePassword from "../components/modals/UpdatePassword";

import '../styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/user/findId/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateSuccess = () => {
    fetchProfile();
  };

  const handleEdit = () => {
    setModalType('edit');
    setShowModal(true);
  };

  const handleChangePass = () => {
    setModalType('password');
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <CustomerRootHeader />
      <div className="admin-nav">
        <AdminNav />
      </div>
      <div className="content">
        <div className="card-details col-6">
          <div className="row text-center">
            <h1>Perfil</h1>
          </div>

          <div className="row mb-3">
            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">Nombre:</strong>
              <span>{`${userData?.result?.name || ''} ${userData?.result?.lastName || ''}`.trim() || "No disponible"}</span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">Email:</strong>
              <span>{userData?.result?.email || 'No disponible'}</span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">Teléfono:</strong>
              <span>{userData?.result?.phone || 'No disponible'}</span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">Compañía:</strong>
              <span>{userData?.result?.company || 'No disponible'}</span>
            </div>
          </div>

          <div className="mb-3">
            <BlueButton onClick={handleEdit}>Actualizar perfil</BlueButton>
          </div>

          <PurpleButton onClick={handleChangePass}>Cambiar contraseña</PurpleButton>
        </div>
      </div>

      {showModal && modalType === 'edit' && (
        <ModalComponent show={showModal} onClose={handleCloseModal} title="Actualizar perfil">
          <UpdateProfile
            profileData={userData?.result}
            handleClose={handleCloseModal}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </ModalComponent>
      )}

      {showModal && modalType === 'password' && (
        <ModalComponent show={showModal} onClose={handleCloseModal} title="Cambiar contraseña">
          <UpdatePassword
            handleClose={handleCloseModal}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </ModalComponent>
      )}
    </div>
  );
}