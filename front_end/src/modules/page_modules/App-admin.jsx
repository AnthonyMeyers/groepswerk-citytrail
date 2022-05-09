import { changeState } from "../../data/admin";
import { useSelector, useDispatch } from "react-redux";

export default function AppAdmin() {
  const { admin } = useSelector((state) => state.adminState);
  const dispatch = useDispatch();
  return (
    <>
      <p>set admin</p>
      <button onClick={() => dispatch(changeState())}>
        activate admin {admin ? "on" : "off"}
      </button>
    </>
  );
}
