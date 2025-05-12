import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_COUNTRIES, ADD_COUNTRY } from '../api/querie';

interface Country {
  id: number;
  name: string;
  code: string;
  emoji: string;
  continent?: { name: string };
}

export function HomePage() {
  const { data } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);
  const [form, setForm] = useState({ name: '', code: '', emoji: '' });

  const [addCountry] = useMutation(ADD_COUNTRY, {
    update(cache, { data }) {
      const newCountry = data?.addCountry;
      if (!newCountry) return;

      const prev = cache.readQuery<{ countries: Country[] }>({ query: GET_COUNTRIES });
      if (prev) {
        cache.writeQuery({
          query: GET_COUNTRIES,
          data: { countries: [...prev.countries, newCountry] },
        });
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, code, emoji } = form;
    if (name && code && emoji) {
      addCountry({ variables: { data: form } });
      setForm({ name: '', code: '', emoji: '' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Liste des Pays</h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          name="name"
          placeholder="Nom"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
        />
        <input
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
        />
        <input
          name="emoji"
          placeholder="Emoji"
          value={form.emoji}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        {data?.countries.map(({ id, name, code, emoji, continent }) => (
          <Link key={id} to={`/country/${code}`}>
            <div className="p-4 border rounded hover:bg-gray-100 transition">
              <span className="text-2xl">{emoji}</span>
              <span className="ml-2 font-semibold">{name}</span>
              {continent?.name && (
                <span className="text-sm text-gray-500"> ({continent.name})</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
