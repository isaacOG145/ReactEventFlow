import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserFrame from "../assets/icons/userFrame.png";
import '../styles/main.css';
import '../styles/modalStyles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ModalComponent from '../components/modals/ModalComponent';
import BlueButton from "./BlueButton";
import PurpleButton from "./PurpleButton";

const ProfileModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        handleLogout();
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
        setIsModalOpen(!isModalOpen);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/user/findId/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.text || "Error al obtener la información del usuario");
            }

            const data = await response.json();
            console.log("Response:", data);

            if (data.type === "SUCCESS") {
                setUserInfo(data.result);
            } else {
                throw new Error(data.text || "Error desconocido");
            }
        } catch (error) {
            setError(error.message);
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            const userId = localStorage.getItem("userId");
            if (userId) {
                fetchUserInfo(userId);
            }
        }
    }, [isModalOpen]);

    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <div>
            {/* Botón para abrir el modal */}
            {!isModalOpen && (
                <button className="icon-button" onClick={toggleModal}>
                    <img className="icon" src={UserFrame} alt="icono" />
                </button>
            )}

            {/* Modal principal de perfil */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="about-profile col-2" onClick={(e) => e.stopPropagation()}>
                        {isAuthenticated ? (
                            <>
                                <div className="profile-header d-flex align-items-center">
                                    <button className="icon-button" onClick={toggleModal}>
                                        <img className="icon" src={UserFrame} alt="icono" />
                                    </button>
                                    <div className="col-9 info">
                                        <div className="row">
                                            <p className="mb-1">
                                                {userInfo ? `${userInfo.name} ${userInfo.lastName || ""}` : "Cargando..."}
                                            </p>
                                        </div>
                                        <div className="row">
                                            <p className="mb-0">
                                                {userInfo ? userInfo.email : "Cargando..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={() => navigate('/usuario/mi-perfil')}>Mi perfil</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {/* Cambiamos handleLogout por handleLogoutClick para mostrar el modal de confirmación */}
                                        <button className="profile-action" onClick={handleLogoutClick}>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="profile-header d-flex align-items-center">
                                    <button className="icon-button" onClick={toggleModal}>
                                        <img className="icon" src={UserFrame} alt="icono" />
                                    </button>
                                    <div className="col-9 info">
                                        <div className="row">
                                            <p className="mb-1">Invitado</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={handleLogin}>
                                            Iniciar sesión
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={() => navigate("/crear-cuenta")}>
                                            Crear cuenta
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Modal de confirmación de logout */}
            <ModalComponent
                show={showLogoutModal}
                title="Cerrar sesión"
                onClose={handleCancelLogout}
            >
                <div className="text-center mb-4">
                    <strong>¿Estás seguro de que deseas cerrar sesión?</strong>
                </div>
                
                <div className="row">
                    <BlueButton onClick={handleConfirmLogout}>Cerrar sesión</BlueButton>
                </div>
                <div className="row">
                    <PurpleButton onClick={handleCancelLogout}>Cancelar</PurpleButton>
                </div>

            </ModalComponent>
        </div>
    );
};

export default ProfileModal;