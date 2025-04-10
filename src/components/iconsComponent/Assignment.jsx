
import React, { useState, useEffect } from 'react';
import ModalComponent from '../modals/ModalComponent';
import SelectInputComponent from '../SelectInput.Component';
import BlueButton from '../BlueButton';
import '../../styles/iconStyles.css';
import '../../styles/main.css';
import AssignmentIcon from '../../assets/icons/asignacion.png';

export default function Assignment({ activityId }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedChecker, setSelectedChecker] = useState("");
    const [checkers, setCheckers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Cargar checkers solo cuando el modal se abre
    useEffect(() => {
        if (showModal) {
            const fetchCheckers = async () => {
                try {
                    setLoading(true);
                    setError("");
                    const bossId = localStorage.getItem('userId');
                    const response = await fetch(`http://localhost:8080/user/findByBoss/${bossId}`);
                    const data = await response.json();

                    if (data.type === "SUCCESS") {
                        const activeCheckers = data.result.filter(checker => checker.status === true);
                        setCheckers(activeCheckers);
                    } else {
                        setError("No se encontraron checadores activos");
                    }
                } catch (err) {
                    setError(`Error al cargar checadores: ${err.message}`);
                } finally {
                    setLoading(false);
                }
            };

            fetchCheckers();
        }
    }, [showModal]);

    const handleAssignChecker = async () => {
        if (!selectedChecker) {
            setError("Por favor, seleccione un checador.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const assignmentData = { userId: selectedChecker, activityId };

            const response = await fetch("http://localhost:8080/assignment/saveAssignment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(assignmentData),
            });

            const data = await response.json();
            if (data.type === "SUCCESS") {
                setSuccessMessage("Asignación realizada con éxito");
                setTimeout(() => {
                    setShowModal(false);
                    setSuccessMessage("");
                }, 1500);
            } else {
                setError("Error al realizar la asignación.");
            }
        } catch (err) {
            setError(`Error al asignar checador: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                }}
                aria-label="Asignar checador"
            >
                <img className="icon-sm" src={AssignmentIcon} alt="asignar" />
            </button>

            <ModalComponent 
                show={showModal} 
                onClose={() => {
                    setShowModal(false);
                    setError("");
                    setSuccessMessage("");
                    setSelectedChecker("");
                }} 
                title="Asignar Checador"
            >
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <SelectInputComponent
                    label="Seleccionar Checador"
                    options={[
                        { value: "", label: "Seleccionar checador activo" },
                        ...checkers.map(checker => ({
                            value: checker.id,
                            label: `${checker.name} ${checker.lastName}`
                        }))
                    ]}
                    value={selectedChecker}
                    onChange={e => setSelectedChecker(e.target.value)}
                    disabled={loading || checkers.length === 0}
                />
                {checkers.length === 0 && !loading && (
                    <p className="text-muted small mt-2">No hay checadores activos disponibles</p>
                )}

                <div className="modal-footer">
                    <BlueButton
                        onClick={handleAssignChecker}
                        disabled={loading || !selectedChecker}
                    >
                        {loading ? "Asignando..." : "Asignar Checador"}
                    </BlueButton>
                </div>
            </ModalComponent>
        </>
    );
}