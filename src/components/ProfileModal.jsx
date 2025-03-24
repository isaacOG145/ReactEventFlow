import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import UserFrame from "../assets/icons/userFrame.png"; // Asegúrate de usar la ruta correcta de tu imagen

const ProfileModal = () => {
    // Estado para manejar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estado para almacenar la información del usuario
    const [userInfo, setUserInfo] = useState(null);

    // Estado para manejar errores
    const [error, setError] = useState(null);

    // Hook para redireccionar
    const navigate = useNavigate();

    // Función para alternar la visibilidad del modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/"); // Redirige al usuario a la página de inicio
    };

    // Función para redirigir al login
    const handleLogin = () => {
        navigate("/login"); // Redirige al usuario a la página de login
    };

    // Función para obtener la información del usuario
    const fetchUserInfo = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/user/findId/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.text || "Error al obtener la información del usuario");
            }

            const data = await response.json();
            console.log("Response:", data); // Depuración: Verifica la respuesta

            // Verifica si la operación fue exitosa
            if (data.type === "SUCCESS") {
                setUserInfo(data.result); // Guarda la información del usuario en el estado
            } else {
                throw new Error(data.text || "Error desconocido");
            }
        } catch (error) {
            setError(error.message); // Maneja errores
            console.error("Error:", error);
        }
    };

    // Efecto para obtener la información del usuario cuando el modal se abre
    useEffect(() => {
        if (isModalOpen) {
            const userId = localStorage.getItem("userId");
            if (userId) {
                fetchUserInfo(userId); // Obtiene la información del usuario
            }
        }
    }, [isModalOpen]);

    // Verifica si hay un token en el localStorage
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <div>
            {/* Botón para abrir el modal */}
            <button className="icon-button" onClick={toggleModal}>
                <img className="icon" src={UserFrame} alt="icono" />
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="about-profile col-2" onClick={(e) => e.stopPropagation()}>
                        {isAuthenticated ? (
                            <>
                                {/* Modal para usuarios autenticados */}
                                <div className="profile-header d-flex align-items-center">
                                    <div className="col-3">
                                        {/* Botón para cerrar el modal */}
                                        <button className="icon-button" onClick={toggleModal}>
                                            <img className="icon" src={UserFrame} alt="icono" />
                                        </button>
                                    </div>
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

                                {/* Botones de acción para usuarios autenticados */}
                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action">Mi perfil</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={handleLogout}>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Modal para usuarios no autenticados */}
                                <div className="profile-header d-flex align-items-center">
                                    <div className="col-3">
                                        {/* Botón para cerrar el modal */}
                                        <button className="icon-button" onClick={toggleModal}>
                                            <img className="icon" src={UserFrame} alt="icono" />
                                        </button>
                                    </div>
                                    <div className="col-9 info">
                                        <div className="row">
                                            <p className="mb-1">Invitado</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Botones de acción para usuarios no autenticados */}
                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={handleLogin}>
                                            Iniciar sesión
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button className="profile-action" onClick={() => navigate("/register")}>
                                            Crear cuenta
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileModal;