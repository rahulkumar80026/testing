
import { createContext, useContext, useState } from "react";
import Loader from "../Loader"; // apna loader component ka path check kar

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && <Loader />}  {/* ✅ loader hamesha globally dikhega */}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
