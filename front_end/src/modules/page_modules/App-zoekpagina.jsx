import getData from "../hooks/api_calls";

import Card from "./subcomp_zoek/Card";

export default function AppZoek() {
  const [countries, error, loading] = getData(
    `http://localhost:8000/api/read.php`
  );

  return (
    <>
      <section className="search">
        <h2 className="search__title">Landen</h2>
        {countries.length > 0 && (
          <ul className="search__list">
            {countries.length > 0 &&
              countries.map((country, i) => {
                return (
                  <Card
                    key={i}
                    className="search__list__item"
                    country={country}
                  />
                );
              })}
          </ul>
        )}
      </section>
    </>
  );
}
