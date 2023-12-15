/* eslint-disable react/prop-types */
import { easeInOut, motion } from "framer-motion"
import { useEffect, useState } from "react";

const UserCard = ({ isOpen, onClose, userId,type}) => {
  const [previousDates, setPreviosDates] = useState({})
  const nameRegex = /^[a-zA-Z\s]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&$.])[A-Za-z\d@$!%*?&]{8,}$/;
  const [erroMess,setErrMess] = useState("")
  const [newData, setNewData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: ''
  });
  const getUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setPreviosDates(data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
   getUser(userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId])

  const updateUser = async (event,userId, data) => {
    event.preventDefault();
    const finalData= {
      nombre: data.nombre.trim() !==''? data.nombre: previousDates.nombre,
      apellido: data.apellido.trim() !==''? data.apellido: previousDates.apellido,
      email: data.email.trim() !==''? data.email: previousDates.email,
      contrasena: data.contrasena.trim() !==''? data.contrasena: previousDates.contrasena,
    }
    if (finalData.nombre || finalData.apellido || finalData.contrasena) {
      if (!nameRegex.test(finalData.nombre)) {
        setErrMess(
          "No estás ingresando el nombre en un formato válido. Por favor, utiliza solo letras y espacios."
        );
        return;
      }
      if (!nameRegex.test(finalData.apellido)) {
        setErrMess(
          "No estás ingresando el apellido en un formato válido. Por favor, utiliza solo letras y espacios."
        );
        return;
      }
      if (!passwordRegex.test(finalData.contrasena)) {
        setErrMess(
          "No estás ingresando la contraseña en un formato válido. Por favor, utiliza letras, mayúsculas, números y al menos un caracter especial."
        );
        return;
      }
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert("Usuario Actualizado correctamente");
        setNewData({
          nombre: "",
          apellido: "",
          email: "",
          contrasena: "",
        });
      } else {
        alert("Error al actualizar los datos del usuario");
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
            <h2 className="text-xl font-bold mb-4">Actualizar Usuario:</h2>
            <form
              onSubmit={(e) => {
                updateUser(e, userId, newData);
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
                  Apellido:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="apellido"
                  type="text"
                  placeholder="Apellido"
                  value={newData.apellido}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Email:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={newData.email}
                  onChange={handleChangeUpdt}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Contraseña:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="contrasena"
                  type="password"
                  placeholder="Contraseña"
                  value={newData.contrasena}
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
              Informacion del usuario <span>{previousDates[0].nombre}</span>
            </h2>
            {previousDates && (
              <div className="h-[70vh] overflow-auto">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 select-none"
                    htmlFor="id"
                  >
                    ID:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="id"
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
                    htmlFor="name"
                  >
                    Apellido:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="apellido"
                  >
                    {previousDates[0].apellido}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Email:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                  >
                    {previousDates[0].email}
                  </span>
                </div>
                <div className="mb-4 select-none">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Contraseña:
                  </label>
                  <span
                    className="flex justify-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="contrasena"
                  >
                    {previousDates[0].contrasena}
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

export default UserCard;