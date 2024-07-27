import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const FormularioProducto = ({ agregarProducto, editarProducto, productoActual, setProductoActual }) => {
    const [form, setForm] = useState({ clave1: '', clave2: '', clave3: false, clave4: '' });

    useEffect(() => {
        if (productoActual) {
            setForm(productoActual);
        }
    }, [productoActual]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productoActual) {
            editarProducto(form);
        } else {
            agregarProducto(form);
        }
        setForm({ clave1: '', clave2: '', clave3: false, clave4: '' });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
                <Form.Label>ID del Producto</Form.Label>
                <Form.Control
                    type="number"
                    id="clave1"
                    name="clave1"
                    value={form.clave1}
                    onChange={handleChange}
                    required
                    disabled={!!productoActual}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                    type="text"
                    id="clave2"
                    name="clave2"
                    value={form.clave2}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    id="clave3"
                    name="clave3"
                    label="Disponible"
                    checked={form.clave3}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Precio del Producto</Form.Label>
                <Form.Control
                    type="text"
                    id="clave4"
                    name="clave4"
                    value={form.clave4}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button type="submit" variant="primary">{productoActual ? 'Editar' : 'Añadir'} Producto</Button>
            {productoActual && <Button variant="secondary" className="ms-2" onClick={() => setProductoActual(null)}>Cancelar</Button>}
        </Form>
    );
};

FormularioProducto.propTypes = {
    agregarProducto: PropTypes.func.isRequired,
    editarProducto: PropTypes.func.isRequired,
    productoActual: PropTypes.shape({
        clave1: PropTypes.number,
        clave2: PropTypes.string,
        clave3: PropTypes.bool,
        clave4: PropTypes.string,
    }),
    setProductoActual: PropTypes.func.isRequired,
};

export default FormularioProducto;
