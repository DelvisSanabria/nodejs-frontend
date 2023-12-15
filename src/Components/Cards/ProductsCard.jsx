/* eslint-disable react/prop-types */
import { easeInOut, motion } from "framer-motion"
import { useEffect, useState } from "react";

const ProductCard = ({ isOpen, onClose, productId, type}) => {
  const [previousDates, setPreviosDates] = useState({})
  const nameRegex = /^[a-zA-Z0-9()\-\s]+$/;
  const priceRegex = /^[\d]+$/;
  const inventRegex = /^[\d]+$/
  const [erroMess,setErrMess] = useState("")
  const [newData, setNewData] = useState({
    nombre: '',
    precio: 0,
    inventario: 0
  });
  const getProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json()
        setPreviosDates(data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
   getProduct(productId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const updateProduct = async (event,productId, data) => {
    event.preventDefault();
    const finalData= {
      nombre: data.nombre.trim() !==0 ? data.nombre: previousDates.nombre,
      precio: data.precio !== 0 ? data.precio: previousDates.precio,
      inventario: data.inventario !== 0 ? data.inventario: previousDates.inventario,
    }
    if (finalData.nombre || finalData.precio || finalData.inventario) {
      if (!nameRegex.test(finalData.nombre)) {
        setErrMess(
          "No estás ingresando el nombre en un formato válido. Por favor, utiliza solo letras,espacios, - y () "
        );
        return;
      }
      if (!priceRegex.test(finalData.precio)) {
        setErrMess(
          "No estás ingresando un monto valido, por favor solo usa numeros para tu monto"
        );
        return;
      }
      if (!inventRegex.test(finalData.inventario)) {
        setErrMess(
          "No estás un formato válido. Por favor, utiliza solo numeros"
        );
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert("Producto Actualizado correctamente");
        setNewData({
          nombre: "",
          precio: 0,
          inventario: 0,
        });
      } else {
        alert("Error al actualizar los datos del Producto");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleChangeUpdt = async (event) => {
    const { name, value } = event.target;
    setNewData({ ...newData, [name]: value });
  };
  return (
    <>
      {isOpen && type === "actualizar" && (
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg">
            {erroMess && (
              <div className="flex justify-center border shadow-md p-4 text-red-500">
                <span>{erroMess}</span>
              </div>
            )}
            <h2 className="text-xl font-bold mb-4">Actualizar Producto:</h2>
            <form
              onSubmit={(e) => {
                updateProduct(e, productId, newData);
              }}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={newData.nombre}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Precio:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="precio"
                  type="text"
                  placeholder="Precio"
                  value={newData.precio}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Inventario:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="inventario"
                  type="number"
                  placeholder="Inventario"
                  value={newData.inventario}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="px-4 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500"
                  onClick={onClose}
                  type="button"
                >
                  Cerrar
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 ml-2"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
      {isOpen && type === "verInfo" && (
        <motion.div
          initial={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -100,
            transitionTimingFunction: easeInOut,
            transitionDuration: 3,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              Informacion del Producto: <span>{previousDates[0].nombre}</span>
            </h2>
            {previousDates && (
              <div className="h-[70vh] overflow-auto">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 select-none"
                    htmlFor="Id"
                  >
                    ID:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="Id"
                  >
                    {previousDates[0]._id}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="nombre"
                  >
                    {previousDates[0].nombre}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="precio"
                  >
                    Precio:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="precio"
                  >
                    {previousDates[0].precio}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="inventario"
                  >
                    Inventario:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="inventario"
                  >
                    {previousDates[0].inventario}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="creationDate"
                  >
                    Fecha de Creacion:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="creationDate"
                  >
                    {previousDates[0].createdAt}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="updateDate"
                  >
                    Ultima Actualizacion:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="updateDate"
                  >
                    {previousDates[0].updatedAt}
                  </span>
                </div>
                <div className="flex justify-center">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500"
                    onClick={onClose}
                    type="button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProductCard;