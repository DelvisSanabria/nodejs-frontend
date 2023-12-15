/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState,useEffect } from "react";
import UserCard from "../Cards/UserCard";

export default function UsersPage(){
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usToUp, setUsToUp] = useState("");
  const [modalType, setModalType] = useState("")
  const nameRegex = /^[a-zA-Z\s]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&$.])[A-Za-z\d@$!%*?&]{8,}$/;
  const [erroMess,setErrMess] = useState("")

  const openModal = async (user) => {
    setModalType("actualizar")
    setIsModalOpen(true);
    setUsToUp(user)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openUserInfo = async (user) => {
    setModalType("verInfo")
    setIsModalOpen(true);
    setUsToUp(user)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [users]);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        alert('Usuario Eliminado correctamente');
      } else {
        alert('Error al eliminar los datos del usuario');
      }
    } catch (error) {
      console.log(error);
    }
  };

    const [datos, setDatos] = useState({
      nombre: '',
      apellido: '',
      email: '',
      contrasena: ''
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if (!datos.nombre || !datos.apellido || !datos.email || !datos.contrasena) {
        alert('Por favor, completa todos los campos');
        return;
      }
      if (datos.nombre && datos.apellido && datos.email && datos.contrasena) {
        if (!nameRegex.test(datos.nombre)) {
          setErrMess(
            "No estás ingresando el nombre en un formato válido. Por favor, utiliza solo letras y espacios."
          );
          return;
        }
        if (!nameRegex.test(datos.apellido)) {
          setErrMess(
            "No estás ingresando el apellido en un formato válido. Por favor, utiliza solo letras y espacios."
          );
          return;
        }
        if (!passwordRegex.test(datos.contrasena)) {
          setErrMess(
            "No estás ingresando la contraseña en un formato válido. Por favor, utiliza letras, mayúsculas, números y al menos un caracter especial."
          );
          return;
        }
      }
        try {
          const response = await fetch("http://localhost:3001/users", {
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
              apellido: '',
              email: '',
              contrasena: ''
            });
            setErrMess("")
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
        <h2>¡Hola! Bienvenido a la Seccion de usuarios</h2>
      </div>
      <div className="p-4 m-3 shadow-md rounded-md border md:h-[25vh]">
        {erroMess && (
          <div className="flex justify-center border shadow-md p-4 text-red-500">
            <span>{erroMess}</span>
          </div>
        )}
        <div className="text-white tracking-wide text-left font-medium mt-4">
          <span>Crea un usuario:</span>
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
            <label htmlFor="apellido" className="flex flex-col p-2">
              Apellido:
              <input
                type="text"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="apellido"
                value={datos.apellido}
                onChange={handleChangeNew}
              />
            </label>
            <label htmlFor="email" className="flex flex-col p-2">
              Email:
              <input
                type="email"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="email"
                value={datos.email}
                onChange={handleChangeNew}
              />
            </label>
            <label htmlFor="contrasena" className="flex flex-col p-2">
              Contraseña:
              <input
                type="password"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="contrasena"
                value={datos.contrasena}
                onChange={handleChangeNew}
              />
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold w-40 my-5 py-2 px-4 rounded-md"
              >
                Crear Usuario
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-4 m-3 shadow-md rounded-md border text-center">
        <div className="p-4 text-white tracking-wide text-left font-medium">
          <p>A continuacion podras ver todos los usuarios registrados:</p>
        </div>
        <div className="w-full overflow-auto p-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Apellido</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td onClick={()=>{openUserInfo(user._id)}} className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer">
                    <div className="md:flex md:flex-wrap md:w-32">
                      <span>{user._id}</span>
                    </div>
                  </td>
                  <td onClick={()=>{openUserInfo(user._id)}} className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer">
                    {user.nombre}
                  </td>
                  <td onClick={()=>{openUserInfo(user._id)}} className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer">
                    {user.apellido}
                  </td>
                  
                  <td className="border px-4 py-2 text-white tracking-wider font-semibold">
                    <div>
                      <div className="grid grid-rows-2">
                        <div className="flex justify-center">
                          <button onClick={()=>{openModal(user._id)}} className="bg-green-500 hover:bg-green-700 text-white font-bold my-3 py-2 px-4 rounded-md">
                            Actualizar Usuario
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => {
                              deleteUser(user._id);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                          >
                            Eliminar Usuario
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
      <UserCard isOpen={isModalOpen} type={modalType} onClose={closeModal} userId={usToUp}></UserCard>
    </div>
  );
}