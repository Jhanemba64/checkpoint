import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">
          Checkpoint
        </Link>
      </nav>
    </header>
  );
}
