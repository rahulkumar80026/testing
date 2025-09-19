// import React, { useEffect, useState } from "react";
// import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { AuthProvider } from "./components/context/AuthContext";
// import { LoaderProvider, useLoader } from "./components/context/LoaderContext";
// import Loader from "./components/Loader";
// import CustomerRoutes from "./routes/customerRoutes";
// import AdminRoutes from "./routes/AdminRoutes";
// import API from "./services/api";
// import { io } from "socket.io-client";

// function LoaderWrapper() {
//   const { loading } = useLoader();
//   return loading ? <Loader /> : null;
// }

// function App() {
//   const [mealData, setMealData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchMenu = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/menu-today"); // always fetch today’s menu
//       setMealData(Array.isArray(res.data) ? res.data[0] : res.data);
//     } catch (err) {
//       console.error(err);
//       setMealData(null);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//   fetchMenu();

//   const socket = io("http://localhost:4000");

//   socket.on("menuUpdated", ({ menu }) => {
//     console.log("🔄 Menu updated from backend:", menu.day);
//     setMealData(menu); // frontend directly update
//   });

//   return () => socket.off("menuUpdated");
// }, []);


//   return (
//     <AuthProvider>
//       <LoaderProvider>
//         <BrowserRouter>
//           <LoaderWrapper />
//           <CustomerRoutes menuData={mealData} />
//           <AdminRoutes onMenuUpdate={fetchMenu} />
//           <ToastContainer position="top-right" autoClose={2000} />
//         </BrowserRouter>
//       </LoaderProvider>
//     </AuthProvider>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./components/context/AuthContext";
import { LoaderProvider, useLoader } from "./components/context/LoaderContext";
import Loader from "./components/Loader";
import CustomerRoutes from "./routes/customerRoutes";
import AdminRoutes from "./routes/adminRoutes";
import API from "./services/api";
import { io } from "socket.io-client";

function LoaderWrapper() {
  const { loading } = useLoader();
  return loading ? <Loader /> : null;
}

function App() {
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await API.get("/menu-today"); // always fetch today's menu
      setMealData(Array.isArray(res.data) ? res.data[0] : res.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setMealData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu(); // initial load

    const socket = io("https://display-menu-1.onrender.com");

    // Only update when backend emits a menu change
    socket.on("menuUpdated", ({ menu }) => {
      console.log("🔄 Menu updated from backend:", menu.day);
      setMealData(menu); // update UI automatically
    });

    return () => socket.off("menuUpdated");
  }, []);

  return (
    <AuthProvider>
      <LoaderProvider>
        <BrowserRouter>
          <LoaderWrapper />
          <CustomerRoutes menuData={mealData} />
          <AdminRoutes onMenuUpdate={fetchMenu} />
          <ToastContainer position="top-right" autoClose={2000} />
        </BrowserRouter>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
