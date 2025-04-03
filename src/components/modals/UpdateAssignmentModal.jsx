import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/modalStyles.css';
import SelectInputComponent from "../SelectInput.Component";
import BlueButton from "../BlueButton";

export default function UpdateAssignmentModal({ showModal, setShowModal, assignmentId, onUpdate }) {
    const [checkers, setCheckers] = useState([]);
    const [selectedChecker, setSelectedChecker] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [assignment, setAssignment] = useState(null);

    const ownerId = localStorage.getItem('userId');

    useEffect(() => {
        if (!ownerId) {
            setError("No se ha encontrado el ID del propietario.");
            return;
        }

        fetch(`http://localhost:8080/user/findByBoss/${ownerId}`)
            .then(response => response.json())
            .then(data => {
                if (data.type === "SUCCESS") {
                    setCheckers(data.result);
                } else {
                    setError("Error al cargar los checadores.");
                }
            })
            .catch(() => setError("Error al cargar los checadores."));

        if (assignmentId) {
            setLoading(true);
            fetch(`http://localhost:8080/assignment/findById/${assignmentId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.type === "SUCCESS") {
                        setAssignment(data.result);
                        setSelectedChecker(data.result.user.id);
                    } else {
                        setError("Error al obtener los detalles de la asignación.");
                    }
                })
                .catch(error => setError("Error al obtener la asignación: " + error.message))
                .finally(() => setLoading(false));
        }
    }, [assignmentId, ownerId]);

    const handleUpdate = async () => {
        // Limpiar mensajes anteriores
        setError("");
        setSuccessMessage("");
        setLoading(true);

        try {
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
                },
                body: JSON.stringify(updateData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al actualizar la asignación.");
            }

            // Obtener datos completos del nuevo checador
            const selectedCheckerData = checkers.find(c => c.id === selectedChecker);
            if (!selectedCheckerData) {
                throw new Error("No se encontró la información del nuevo checador.");
            }

            // Preparar datos actualizados
            const updatedAssignment = {
                ...assignment,
                user: {
                    ...selectedCheckerData,
                    id: selectedChecker
                },
                status: assignment.status // Mantener el estado actual
            };

            setSuccessMessage("Asignación actualizada con éxito.");
            onUpdate(updatedAssignment); // Pasar los datos completos al padre

            setTimeout(() => setShowModal(false), 1500);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!showModal || !assignment) return null;

    const activityName = assignment.activity ? assignment.activity.name : "Actividad no disponible";
    const checkerName = `${assignment.user.name} ${assignment.user.lastName}`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h1>Actualizar Asignación</h1>
                    <button className="close-button" onClick={() => setShowModal(false)}>×</button>
                </div>
                <div className="modal-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <div className="form-group">
                        <label>Actividad</label>
                        <input type="text" className="form-control" value={activityName} disabled />
                    </div>

                    <div className="form-group">
                        <label>Checador Actual</label>
                        <input type="text" className="form-control" value={checkerName} disabled />
                    </div>

                    <div className="form-group">
                        <label>Nuevo Checador</label>
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
                        />
                    </div>
                </div>

                <div className="modal-footer">
                    <BlueButton onClick={handleUpdate} disabled={loading || !selectedChecker}>
                        {loading ? "Actualizando..." : "Actualizar Asignación"}
                    </BlueButton>
                </div>
            </div>
        </div>
    );
}