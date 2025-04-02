import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserFrame from "../assets/icons/userFrame.png";
import Logout from "../components/modals/logout"; // Importa el modal de confirmación

import '../styles/main.css';

const ProfileModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Estado para el modal de cierre de sesión
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const toggleLogoutModal = () => setIsLogoutModalOpen(!isLogoutModalOpen); // Función para manejar el modal de logout

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/"); 
    };

    const handleLogoutClick = () => {
        setIsLogoutModalOpen(true); // Abre el modal de confirmación en lugar de cerrar sesión directamente
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
            <button className="icon-button" onClick={toggleModal}>
                <img className="icon" src={UserFrame} alt="icono" />
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="about-profile col-2" onClick={(e) => e.stopPropagation()}>
                        {isAuthenticated ? (
                            <>
                                <div className="profile-header d-flex align-items-center">
                                    <div className="col-3">
                                        <button className="icon-button" onClick={toggleModal}>
                                            <img className="icon" src={UserFrame} alt="icono" />
                                        </button>
                                    </div>
                                    <div className="col-9 info">
                                        <p className="mb-1">
                                            {userInfo ? `${userInfo.name} ${userInfo.lastName || ""}` : "Cargando..."}
                                        </p>
                                        <p className="mb-0">
                                            {userInfo ? userInfo.email : "Cargando..."}
                                        </p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action">Mi perfil</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={handleLogoutClick}>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="profile-header d-flex align-items-center">
                                    <div className="col-3">
                                        <button className="icon-button" onClick={toggleModal}>
                                            <img className="icon" src={UserFrame} alt="icono" />
                                        </button>
                                    </div>
                                    <div className="col-9 info">
                                        <p className="mb-1">Invitado</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={() => navigate("/login")}>
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

            {/* Modal de Confirmación de Cierre de Sesión */}
            <Logout 
                show={isLogoutModalOpen} 
                handleClose={toggleLogoutModal} 
                handleLogout={handleLogout} 
            />
        </div>
    );
};

export default ProfileModal;
