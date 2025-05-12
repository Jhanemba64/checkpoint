import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY_BY_CODE } from "../api/querie";

export function OneCountryPage() {
  const { id } = useParams();
  const { data } = useQuery(GET_COUNTRY_BY_CODE, {
    variables: { code: id },
  });

  const country = data?.country;

  return (
    <div>
      <Link to="/">Retour</Link>
      {country && (
        <>
          <h2>{country.emoji} {country.name}</h2>
          <p>Code : {country.code}</p>
          {country.continent && <p>Continent : {country.continent.name}</p>}
        </>
      )}
    </div>
  );
}
