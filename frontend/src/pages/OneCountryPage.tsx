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
    <div className="max-w-xl mx-auto p-4">
      <Link
        to="/"
        className="text-blue-600 hover:underline block mb-4"
      >
        ← Retour à la liste
      </Link>

      {country && (
        <div className="border rounded p-4 shadow-sm bg-white">
          <h2 className="text-2xl font-bold mb-2">
            <span className="text-3xl">{country.emoji}</span> {country.name}
          </h2>
          <p className="text-gray-700 mb-1">
            <strong>Code :</strong> {country.code}
          </p>
          {country.continent && (
            <p className="text-gray-700">
              <strong>Continent :</strong> {country.continent.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
