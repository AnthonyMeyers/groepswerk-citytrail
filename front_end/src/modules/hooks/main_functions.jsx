export function Status({ error, loading }) {
  return (
    <>
      {loading && <h3 className="loading">loading</h3>}
      {error && <h3 className="error">error</h3>}
    </>
  );
}
