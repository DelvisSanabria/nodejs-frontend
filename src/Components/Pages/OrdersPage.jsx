/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState,useEffect } from "react";
import OrderCard from "../Cards/OrderCard";

export default function ProductsPage(){
  const [orders, setOrders] = useState([]);
  const [listProd, setListProd] = useState([]);
  const [selectedOption, setSelectedOption] = useState("")
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ordsToUp, setOrdsToUp] = useState("");
  const [modalType, setModalType] = useState("")
  const userRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/;
  const totalRegex = /^[\d]+$/;
  const [erroMess,setErrMess] = useState("")

  const openModal = async (order) => {
    setModalType("actualizar")
    setIsModalOpen(true);
    setOrdsToUp(order)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openOrderInfo = async (order) => {
    setModalType("verInfo")
    setIsModalOpen(true);
    setOrdsToUp(order)
  };


  useEffect(()=>{
    setDatos((prevDatos)=>({...prevDatos,productos:productos.join(", ")}))
  },[productos])

  const handleChangeProducts = (event)=>{
    const seleccion = event.target.value;
    setProductos((prevProductos)=>[...prevProductos,seleccion])
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    const productList = async () => {
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setListProd(data);
      } catch (error) {
        console.log(error);
      }
    };

    productList();
    fetchData();
  }, [orders]);

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        alert('Orden Eliminada correctamente');
      } else {
        alert('Error al eliminar los datos de la Orden');
      }
    } catch (error) {
      console.log(error);
    }
  };

    const [datos, setDatos] = useState({
      usuario: '',
      productos: productos.join(", "),
      total: 0
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!datos.usuario || !datos.productos || !datos.total) {
        alert('Por favor, completa todos los campos');
        return;
      }

      if (datos.usuario && datos.total) {
        if (!userRegex.test(datos.usuario)) {
          setErrMess(
            "No estás ingresando el ID del usuario en un formato válido. Por favor, utiliza solo letras y numeros sin espacios"
          );
          return;
        }
        if (!totalRegex.test(datos.total)) {
          setErrMess(
            "No estás ingresando un monto valido, por favor solo usa numeros para tu monto"
          );
          return;
        }
      }

        try {
          const response = await fetch("http://localhost:3001/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
          });
    
          if (response.ok) {
            alert('Datos enviados correctamente');
            setProductos([]);
            setDatos({
              usuario: '',
              productos: productos,
              total: 0
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
        <h2>¡Hola! Bienvenido a la Seccion de Ordenes</h2>
      </div>
      <div className="p-4 m-3 shadow-md rounded-md border md:h-[25vh]">
        {erroMess && (
          <div className="flex justify-center border shadow-md p-4 text-red-500">
            <span>{erroMess}</span>
          </div>
        )}
        <div className="text-white tracking-wide text-left font-medium">
          <span>Crea una Orden:</span>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-rows-5 justify-center md:grid-cols-5"
          >
            <label htmlFor="usuario" className="flex flex-col p-2">
              Usuario(ID):
              <input
                type="text"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="usuario"
                value={datos.usuario}
                onChange={handleChangeNew}
              />
            </label>
            <label htmlFor="productos" className="flex flex-col p-2">
              Productos:
              <select
                type="text"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="productos"
                value={selectedOption}
                onChange={handleChangeProducts}
              >
                <option className="text-black/75" value="">
                  Productos
                </option>
                {listProd.map((product) => (
                  <option
                    className="text-black/75"
                    key={product._id}
                    value={product._id}
                  >
                    {product.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="total" className="flex flex-col p-2">
              Total:
              <input
                type="text"
                className="text-white rounded-lg p-2 px-3 my-2 bg-white bg-opacity-30 outline-none"
                name="total"
                value={datos.total}
                onChange={handleChangeNew}
              />
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold w-40 my-5 py-2 px-4 rounded-md"
              >
                Crear Orden
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-4 m-3 shadow-md rounded-md border text-center">
        <div className="p-4 text-white tracking-wide text-left font-medium">
          <p>A continuacion podras ver todas las Ordenes registradas:</p>
        </div>
        <div className="w-full overflow-auto p-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Id</th>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Productos</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td
                    onClick={() => {
                      openOrderInfo(order._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold"
                  >
                    <div className="md:flex md:flex-wrap md:w-24 md:overflow-auto cursor-pointer">
                      <span>{order._id}</span>
                    </div>
                  </td>
                  <td
                    onClick={() => {
                      openOrderInfo(order._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer"
                  >
                    {order.usuario}
                  </td>
                  <td
                    onClick={() => {
                      openOrderInfo(order._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer"
                  >
                    {order.productos.map((product) => {
                      return `${product}`;
                    })}
                  </td>
                  <td
                    onClick={() => {
                      openOrderInfo(order._id);
                    }}
                    className="border px-4 py-2 text-white tracking-wider font-semibold cursor-pointer"
                  >
                    {order.total}
                  </td>
                  <td className="border px-4 py-2 text-white tracking-wider font-semibold">
                    <div>
                      <div className="grid grid-rows-2">
                        <div className="flex justify-center">
                          <button
                            onClick={() => {
                              openModal(order._id);
                            }}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold my-3 py-2 px-4 rounded-md"
                          >
                            Actualizar Orden
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => {
                              deleteOrder(order._id);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                          >
                            Eliminar Orden
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
      <OrderCard
        isOpen={isModalOpen}
        onClose={closeModal}
        type={modalType}
        orderId={ordsToUp}
      ></OrderCard>
    </div>
  );
}