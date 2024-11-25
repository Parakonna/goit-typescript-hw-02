import css from './SearchBar.module.css'

const SearchBar = ({ onSubmit }) => {

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