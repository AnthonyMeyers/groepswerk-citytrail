export function Status({ error, loading }) {
  return (
    <>
      {loading && (
        <>
          <img src="../src/images/loading.gif" className="loading" />
        </>
      )}
      {error && <h3 className="error">Geen data gevonden</h3>}
    </>
  );
}
