import { useState, useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../Provider";

export default function AppAdmin() {
  const { admin, setAdmin } = useContext(AdminContext);

  return (
    <>
      <p>set admin</p>
      <button onClick={() => setAdmin(!admin)}>active admin </button>
    </>
  );
}
