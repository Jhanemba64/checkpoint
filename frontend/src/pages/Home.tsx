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
  const { loading, error, data } = useQuery<{ countries: Country[] }>(GET_COUNTRIES);
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h1>Liste des Pays</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} />
        <input name="code" placeholder="Code" value={form.code} onChange={handleChange} />
        <input name="emoji" placeholder="Emoji" value={form.emoji} onChange={handleChange} />
        <button type="submit">Ajouter</button>
      </form>

      <div>
        {data?.countries.map(({ id, name, code, emoji, continent }) => (
          <Link key={id} to={`/country/${code}`}>
            <div>
              <span>{emoji}</span>
              <span>{name}</span>
              {continent?.name && <span> ({continent.name})</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
