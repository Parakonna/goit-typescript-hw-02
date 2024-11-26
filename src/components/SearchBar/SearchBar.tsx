import { FormEvent } from 'react';
import css from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (ev: FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {

  return (
    <header className={css.header}>
  <form onSubmit={onSubmit}>
              <input className={css.input}
      type="text"
      autoComplete="off"
          autoFocus
          name="input"
    placeholder="Search images and photos"
    />
    <button className={css.button} type="submit">Search</button>
          </form>
</header>
  )
}

export default SearchBar