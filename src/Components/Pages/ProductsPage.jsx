/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState,useEffect } from "react";
import ProductCard from "../Cards/ProductsCard";

export default function ProductsPage(){
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prodToUp, setProdToUp] = useState("");
  const [modalType, setModalType] = useState("")
  const nameRegex = /^[a-zA-Z0-9()\-\s]+$/;
  const priceRegex = /^[\d]+$/;
  const inventRegex = /^[\d]+$/
  const [erroMess,setErrMess] = useState("")

  const openModal = async (product) => {
    setModalType("actualizar")
    setIsModalOpen(true);
    setProdToUp(product)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openProductInfo = async (product) => {
    setModalType("verInfo")
    setIsModalOpen(true);
    setProdToUp(product)
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [products]);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        alert('Producto Eliminado correctamente');
      } else {
        alert('Error al eliminar los datos del Producto');
      }
    } catch (error) {
      console.log(error);
    }
  };

    const [datos, setDatos] = useState({
      nombre: '',
      precio: 0,
      inventario: 0
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!datos.nombre || !datos.precio || !datos.inventario) {
        alert('Por favor, completa todos los campos');
        return;
      }
      if (datos.nombre && datos.precio && datos.inventario) {
        if (!nameRegex.test(datos.nombre)) {
          setErrMess(
            "No estás ingresando el nombre en un formato válido. Por favor, utiliza solo letras,espacios, - y ()."
          );
          return;
        }
        if (!priceRegex.test(datos.precio)) {
          setErrMess(
            "No estás ingresando un monto valido, por favor solo usa numeros para tu monto"
          );
          return;
        }
        if (!inventRegex.test(datos.inventario)) {
          setErrMess(
            "No estás un formato válido. Por favor, utiliza solo numeros"
          );
          return;
        }
      }

        try {
          const response = await fetch("http://localhost:3001/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
          });
    
          if (response.ok) {
            alert('Datos enviados correctamente');
            setDatos({
              nombre: '',
              precio: 0,
              inventario: 0
            });
          } else {
            alert('Error al enviar los datos');
          }
        } catch (error) {
          console.log(error);
        }
    };
  
    const handleChangeNew = async (event) => {
      const { name, value } = event.target;
      setDatos({ ...datos, [name]: value });
    };

  return (
    <div>
      <div className="text-white tracking-wider font-semibold text-2xl text-center p-4">
        <h2>¡Hola! Bienvenido a la Seccion de Productos</h2>
      </div>
      <div className="p-4 m-3 shadow-md rounded-md border md:h-[25vh]">
        {erroMess && (
          <div className="flex justify-center border shadow-md p-4 text-red-500">
            <span>{erroMess}</span>
          </div>
        )}
        <div className="text-white tracking-wide text-left font-medium mt-4">
          <span>Crea un Producto:</span>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-rows-5 justify-center md:grid-cols-5"
          >
            <label htmlFor="nombre" className="flex flex-col p-2">
              Nombre:
              <input
                type="text"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="nombre"
                value={datos.nombre}
                onChange={handleChangeNew}
              />
            </label>
            <label htmlFor="precio" className="flex flex-col p-2">
              Precio:
              <input
                type="text"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="precio"
                value={datos.precio}
                onChange={handleChangeNew}
              />
            </label>
            <label htmlFor="inventario" className="flex flex-col p-2">
              Inventario:
              <input
                type="number"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="inventario"
                value={datos.inventario}
                onChange={handleChangeNew}
              />
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold w-40 my-5 py-2 px-4 rounded-md"
              >
                Crear Producto
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-4 m-3 shadow-md rounded-md border text-center">
        <div className="p-4 text-white tracking-wide text-left font-medium">
          <p>A continuacion podras ver todos los Productos registrados:</p>
        </div>
        <div className="w-full overflow-auto p-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Precio</th>
                <th className="px-4 py-2">Inventario</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="select-none">
                  <td
                    onClick={() => {
                      openProductInfo(product._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer"
                  >
                    <div className="md:flex md:flex-wrap md:w-44">
                      <span>{product._id}</span>
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      openProductInfo(product._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer"
                  >
                    {product.nombre}
                  </td>
                  <td
                    onClick={() => {
                      openProductInfo(product._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer"
                  >
                    {product.precio}
                  </td>
                  <td
                    onClick={() => {
                      openProductInfo(product._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer"
                  >
                    {product.inventario}
                  </td>
                  <td className="border px-4 py-2 text-white tracking-wider font-semibold">
                    <div>
                      <div className="grid grid-rows-2">
                        <div className="flex justify-center">
                          <button
                            onClick={() => {
                              openModal(product._id);
                            }}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold my-3 py-2 px-4 rounded-md"
                          >
                            Actualizar Producto
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => {
                              deleteProduct(product._id);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                          >
                            Eliminar Producto
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductCard
        isOpen={isModalOpen}
        type={modalType}
        onClose={closeModal}
        productId={prodToUp}
      ></ProductCard>
    </div>
  );
}