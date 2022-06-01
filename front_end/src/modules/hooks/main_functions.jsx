export function Status({ error, loading, loader }) {
  return (
    <>
      {loading && <img src={loader} className="loading" />}
      {error && <h3 className="error">Geen data gevonden</h3>}
    </>
  );
}

export function Messagebar({errorhandler, children}){
  return <>
{<p className="error">{children}</p>}
  </>
}