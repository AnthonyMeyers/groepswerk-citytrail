import { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const AdminContext = createContext();

export default function Provider({ children }) {
  const [admin, setAdmin] = useState(false);

  const value = { admin, setAdmin };

  return (
    <>
      <AdminContext.Provider value={value}>
        <Router>{children}</Router>
      </AdminContext.Provider>
    </>
  );
}
