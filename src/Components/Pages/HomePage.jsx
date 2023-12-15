import { useEffect,useState } from "react";

export default function HomePage(){
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
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
    const fetchProducts = async () => {
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

    const fetchOrders = async () => {
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

    fetchData();
    fetchProducts();
    fetchOrders();
  }, []);


  return(
    <div>
      <div className="text-white tracking-wider font-semibold text-2xl text-center p-4">
        <h2>¡Bienvenido al dashboard de administracion!</h2>
      </div>
      <div className="p-4 m-3 shadow-md rounded-md border">
        <div className="text-white tracking-wide text-left font-medium">
          <p>A continuacion podras ver un balance total de nuestra base de datos:</p>
        </div>
        <div className="grid justify-center">
          <div className="bg-green-500 font-bold rounded-xl w-72 p-2 m-2 grid grid-rows-2 gap-2 items-center justify-items-center">
            <h4>Total de usuarios Registrados</h4>
            <span className="text-3xl">{users.length}</span>
          </div>
          <div className="bg-sky-700 font-bold rounded-xl w-72 p-2 m-2 grid grid-rows-2 gap-2 items-center justify-items-center">
            <h4>Total de productos Registrados</h4>
            <span className="text-3xl">{products.length}</span>
          </div>
          <div className="bg-slate-500 font-bold rounded-xl w-72 p-2 m-2 grid grid-rows-2 gap-2 items-center justify-items-center">
            <h4>Total de ordenes Registradas</h4>
            <span className="text-3xl">{orders.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}