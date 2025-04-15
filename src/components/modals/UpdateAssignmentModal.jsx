import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectInputComponent from "../SelectInput.Component";
import BlueButton from "../BlueButton";
import PurpleButton from '../PurpleButton';
import MessageModal from '../../components/modals/MessageModal';

export default function UpdateAssignmentModal({ assignmentId, onUpdate, onClose }) {
    const [checkers, setCheckers] = useState([]);
    const [selectedChecker, setSelectedChecker] = useState("");
    const [loading, setLoading] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const showNotification = (message, type = "success", duration = 2500) => {
        setNotification({ show: true, message, type });

        if (type !== "loading") {
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));

                // Cerrar solo si es éxito
                if (type === "success" && onClose) {
                    onClose();
                }
            }, duration);
        }
    };

    const ownerId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!ownerId) {
                    showNotification("No se ha encontrado el ID del propietario", "error");
                    return;
                }

                // Cargar checkers
                const checkersResponse = await fetch(`http://localhost:8080/user/findByBoss/${ownerId}`,{
                    headers:{
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const checkersData = await checkersResponse.json();

                if (checkersData.type === "SUCCESS") {
                    const activos = checkersData.result.filter(c => c.status === true);
                    setCheckers(activos);
                } else {
                    showNotification(checkersData.message || "No se encontraron checadores activos", "error");
                }

                // Cargar asignación si hay ID
                if (assignmentId) {
                    setLoading(true);
                    const assignmentResponse = await fetch(`http://localhost:8080/assignment/findById/${assignmentId}`,{
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const assignmentData = await assignmentResponse.json();

                    if (assignmentData.type === "SUCCESS") {
                        setAssignment(assignmentData.result);
                        setSelectedChecker(assignmentData.result.user.id);
                    } else {
                        showNotification("Error al obtener los detalles de la asignación", "error");
                    }
                }
            } catch (error) {
                showNotification("Error al cargar datos: " + error.message, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [assignmentId, ownerId]);

    const handleUpdate = async () => {
        try {
            setLoading(true);

            // Validaciones
            if (!selectedChecker) {
                throw new Error("Por favor, seleccione un checador.");
            }

            if (!assignment || !assignment.activity) {
                throw new Error("No se pudo obtener la actividad asociada.");
            }

            const updateData = {
                assignmentId: assignment.id,
                userId: selectedChecker,
                activityId: assignment.activity.id,
            };

            const response = await fetch("http://localhost:8080/assignment/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al actualizar la asignación");
            }

            if (data.type === "WARNING") {
                showNotification(data.text || "Advertencia", "warning");
                return;
            }

            if (data.type === "SUCCESS") {
                const selectedCheckerData = checkers.find(c => c.id == selectedChecker);
                if (!selectedCheckerData) {
                    throw new Error("No se encontró la información del nuevo checador.");
                }

                const updatedAssignment = {
                    ...assignment,
                    user: {
                        ...selectedCheckerData,
                        id: selectedChecker
                    },
                    status: assignment.status
                };

                showNotification("Asignación actualizada con éxito", "success");
                setTimeout(() => {
                    onUpdate(updatedAssignment);
                }, 2500);

            }
        } catch (error) {
            showNotification(error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    if (!assignment) {
        return (
            <div className="text-center p-4">
                {loading ? "Cargando..." : "No se encontró la asignación"}
            </div>
        );
    }

    const activityName = assignment.activity?.name || "Actividad no disponible";
    const checkerName = `${assignment.user.name} ${assignment.user.lastName}`;

    return (
        <div className="p-3">
            <div className="form-group mb-3">
                <label className="form-label">Actividad</label>
                <input type="text" className="form-control" value={activityName} disabled />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">Checador Actual</label>
                <input type="text" className="form-control" value={checkerName} disabled />
            </div>

            <div className="form-group mb-4">
                <label className="form-label">Nuevo Checador</label>
                <SelectInputComponent
                    options={[
                        { value: "", label: "Seleccionar checador" },
                        ...checkers.map(checker => ({
                            value: checker.id,
                            label: `${checker.name} ${checker.lastName}`
                        }))
                    ]}
                    value={selectedChecker}
                    onChange={e => setSelectedChecker(e.target.value)}
                    disabled={loading}
                />
            </div>

            <div className="mb-3">

                <BlueButton
                    onClick={handleUpdate}
                    disabled={loading || !selectedChecker}
                >
                    {loading ? "Actualizando..." : "Actualizar"}
                </BlueButton>
            </div>
            <PurpleButton
                onClick={onClose} >
                Cancelar
            </PurpleButton>


            <MessageModal
                show={notification.show}
                onClose={() => setNotification(prev => ({ ...prev, show: false }))}
                type={notification.type}
                message={notification.message}
            />
        </div>
    );
}