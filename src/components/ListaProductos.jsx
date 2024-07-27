import PropTypes from 'prop-types';
import { ListGroup, Button } from 'react-bootstrap';

const ListaProductos = ({ productos, editarProducto, eliminarProducto }) => {
    return (
        <div className="mt-4">
            <h3>Lista de Productos</h3>
            <ListGroup>
                {productos.map((producto) => (
                    <ListGroup.Item key={producto.clave1} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{producto.clave1}</strong> - {producto.clave2} - {producto.clave3 ? 'Disponible' : 'No disponible'} - {producto.clave4}
                        </div>
                        <div>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => editarProducto(producto)}>Editar</Button>
                            <Button variant="danger" size="sm" onClick={() => eliminarProducto(producto.clave1)}>Eliminar</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

ListaProductos.propTypes = {
    productos: PropTypes.arrayOf(
        PropTypes.shape({
            clave1: PropTypes.number.isRequired,
            clave2: PropTypes.string.isRequired,
            clave3: PropTypes.bool.isRequired,
            clave4: PropTypes.string.isRequired,
        })
    ).isRequired,
    editarProducto: PropTypes.func.isRequired,
    eliminarProducto: PropTypes.func.isRequired,
};

export default ListaProductos;
