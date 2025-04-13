import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import "../styles/tableStyles.css";
import "../styles/iconStyles.css";

import voidImg from '../assets/icons/void.png';

import Carrusel from "./Carrusel";
import BlueButton from "./BlueButton";
import NavigatePurpleButton from "./NavigatePurpleButton";
import UpdateWorkshopModal from "./modals/UpdateWorkshopModal";

export default function ChargeWorkshop({ id }) {
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        id: "",
        name: "",
        description: "",
        imageUrls: [],
        speaker: "",
        quota: "",
        time: "",
        fromActivity: {}
    });
    const [userActivities, setUserActivities] = useState([]);
    const [attendanceCount, setAttendanceCount] = useState({ yes: 0, no: 0 });
    const [showModal, setShowModal] = useState(false);
    const [workshopToEdit, setWorkshopToEdit] = useState(null);

    // Estados de carga
    const [loadingEvent, setLoadingEvent] = useState(true);
    const [loadingUserActivities, setLoadingUserActivities] = useState(true);
    const [error, setError] = useState(null);

    const handleEdit = () => {
        setWorkshopToEdit(eventData);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleUpdateSuccess = () => {
        fetchEventData();
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hourNumber = parseInt(hours, 10);
        const suffix = hourNumber >= 12 ? 'pm' : 'am';
        const formattedHour = hourNumber % 12 === 0 ? 12 : hourNumber % 12;
        return `${formattedHour}:${minutes.toString().padStart(2, '0')}${suffix}`;
    };

    const handleView = (route) => {
        navigate(route);
    };

    const handleReturn = () => {
        navigate(-1);
    };

    const fetchEventData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/activity/workshop/findById/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.type === "SUCCESS") {
                setEventData({
                    id: data.result.id,
                    name: data.result.name,
                    description: data.result.description,
                    imageUrls: data.result.imageUrls || [],
                    speaker: data.result.speaker || "",
                    quota: data.result.quota || "",
                    time: data.result.time || "",
                    fromActivity: data.result.fromActivity || {}
                });
            } else {
                throw new Error(data.text || "Error al obtener los datos del evento");
            }
        } catch (err) {
            console.error("Error fetching event data:", err);
            setError(err.message);
        } finally {
            setLoadingEvent(false);
        }
    };

    // Cargar datos del evento
    useEffect(() => {

        fetchEventData();
    }, [id]);

    // Cargar usuarios de la actividad
    useEffect(() => {
        const fetchUserActivities = async () => {
            try {
                const usersResponse = await fetch(`http://localhost:8080/user-activities/findByActivity/${id}`);
                if (usersResponse.status === 404) {
                    setUserActivities([]);
                    return;
                }
                if (!usersResponse.ok) {
                    throw new Error(`HTTP error! status: ${usersResponse.status}`);
                }
                const usersData = await usersResponse.json();
                if (usersData.type === "SUCCESS") {
                    setUserActivities(usersData.result);
                    const yesCount = usersData.result.filter(userActivity => userActivity.verified).length;
                    const noCount = usersData.result.length - yesCount;
                    setAttendanceCount({ yes: yesCount, no: noCount });
                } else {
                    throw new Error(usersData.text || "Error al obtener los usuarios de la actividad");
                }
            } catch (err) {
                console.error("Error fetching user activities:", err);
                setError(err.message);
            } finally {
                setLoadingUserActivities(false);
            }
        };

        fetchUserActivities();
    }, [id]);

    if (loadingEvent || loadingUserActivities) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2">Cargando detalles del evento...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Error al cargar los datos: {error}
            </div>
        );
    }

    return (
        <div className="mb-4">
            <div className="card-details col-12 col-lg-10 col-xl-10 mx-auto">
                <h1>{eventData.name}</h1>
                <div className="row mb-2">
                    <div className="col-12">
                        <div className="row g-2"> {/* `g-2` añade espacio entre badges cuando se apilen */}
                            {/* Badge 1 */}
                            <div className="col-auto"> {/* `col-auto` ajusta el ancho al contenido */}
                                <span className="badge bg-purple text-white">
                                    Evento relacionado: {eventData.fromActivity.name}
                                </span>
                            </div>

                            {/* Badge 2 */}
                            <div className="col-auto">
                                <span className="badge bg-magent text-white">
                                    Cupo: {eventData.quota}
                                </span>
                            </div>

                            {/* Badge 3 */}
                            <div className="col-auto">
                                <span className="badge bg-blue text-white">
                                    Hora: {formatTime(eventData.time)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <p>
                    <strong>Ponente:</strong> {eventData.speaker}
                </p>

                <p>
                    <strong>Descripción:</strong> {eventData.description}
                </p>

                <div className="col-12 col-md-6 d-flex gap-2">
                    <a href="#!" className="event-info" onClick={(e) => {
                        e.preventDefault();
                        handleView(`/administrar/ver-checador-taller/${eventData.id}`);
                    }}>
                        Ver checador
                    </a>
                    <a href="#!" className="event-info" onClick={(e) => {
                        e.preventDefault();
                        handleView(`/administrar/detalles-evento/${eventData.fromActivity.id}`);
                    }}>
                        Ver evento asociado
                    </a>
                </div>

                {eventData.imageUrls.length > 0 ? (
                    <Carrusel images={eventData.imageUrls} />
                ) : (
                    <div className="alert alert-info">
                        No hay imágenes disponibles para este evento
                    </div>
                )}

                <div className="row mt-3">
                    <div className="col-6"></div>
                    <div className="col-12 col-md-3 mb-2">
                        <NavigatePurpleButton onClick={handleReturn}>Volver</NavigatePurpleButton>
                    </div>
                    <div className="col-12 col-md-3 mb-2">
                        <BlueButton onClick={handleEdit}>Actualizar</BlueButton>
                    </div>
                </div>
            </div>

            <div className="row mt-4 d-flex justify-content-center">
                <div className="col-12 col-lg-10 col-xl-10 mx-auto">
                    <h1>Asistencias</h1>

                    {userActivities.length === 0 ? (
                        <div className="card-details" role="alert">
                            <div className="row justify-content-center text-center">
                                <img className="icon-xxlg" src={voidImg} alt="void" />
                            </div>
                            <div className="row justify-content-center text-center">
                                <strong>No hay usuarios inscritos en este taller aún.</strong>
                            </div>
                        </div>

                    ) : (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Nombre del invitado</th>
                                        <th>Correo del invitado</th>
                                        <th>
                                            Asistencia {attendanceCount.yes}/{attendanceCount.yes + attendanceCount.no}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userActivities.map((userActivity, index) => (
                                        <tr key={userActivity.id}>
                                            <td className="td-blue">{index + 1}</td>
                                            <td>{`${userActivity.user.name} ${userActivity.user.lastName}`}</td>
                                            <td className="td-blue">{userActivity.user.email}</td>
                                            <td>
                                                <span
                                                    style={{
                                                        color: userActivity.verified ? "#28A745" : "#DC3545",
                                                    }}
                                                >
                                                    {userActivity.verified ? "Asistió" : "No asistió"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    )}
                </div>
                <UpdateWorkshopModal
                    showModal={showModal}
                    workshopData={workshopToEdit}
                    handleClose={handleCloseModal}
                    onUpdateSuccess={handleUpdateSuccess}
                />

            </div>

        </div>
    );

}
