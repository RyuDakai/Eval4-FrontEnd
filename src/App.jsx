import { useState, useEffect } from 'react';
import FormularioProducto from './components/FormularioProducto';
import ListaProductos from './components/ListaProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, Toast } from 'react-bootstrap';
import './index.css';

const App = () => {
    const [productos, setProductos] = useState([]);
    const [productoActual, setProductoActual] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [mostrarToast, setMostrarToast] = useState(false);

    useEffect(() => {
        const productosAlmacenados = JSON.parse(localStorage.getItem('items'));
        if (productosAlmacenados) {
            setProductos(productosAlmacenados);
        }
    }, []);

    const guardarEnLocalStorage = (productos) => {
        localStorage.setItem('items', JSON.stringify(productos));
    };

    const mostrarMensaje = (msg) => {
        setMensaje(msg);
        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 3000);
    };

    const agregarProducto = (producto) => {
        const existeDuplicado = productos.some((p) => p.clave1 === producto.clave1);
        if (existeDuplicado) {
            alert('Error: ID del producto ya existe');
            return;
        }
        const nuevosProductos = [...productos, producto];
        setProductos(nuevosProductos);
        guardarEnLocalStorage(nuevosProductos);
        mostrarMensaje('Producto añadido con éxito');
    };

    const editarProducto = (producto) => {
        const nuevosProductos = productos.map((p) => (p.clave1 === producto.clave1 ? producto : p));
        setProductos(nuevosProductos);
        guardarEnLocalStorage(nuevosProductos);
        setProductoActual(null);
        mostrarMensaje('Producto editado con éxito');
    };

    const eliminarProducto = (clave1) => {
        const nuevosProductos = productos.filter((producto) => producto.clave1 !== clave1);
        setProductos(nuevosProductos);
        guardarEnLocalStorage(nuevosProductos);
        mostrarMensaje('Producto eliminado con éxito');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Gestión de Productos</h1>
            <p className="description text-center">Administra los productos de tu tienda de manera fácil y eficiente.</p>
            <FormularioProducto agregarProducto={agregarProducto} editarProducto={editarProducto} productoActual={productoActual} setProductoActual={setProductoActual} />
            <ListaProductos productos={productos} editarProducto={setProductoActual} eliminarProducto={eliminarProducto} />
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setMostrarToast(false)} show={mostrarToast} delay={3000} autohide>
                    <Toast.Body>{mensaje}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default App;
