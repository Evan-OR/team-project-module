import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/searchBarWrapper.module.scss';
import { Drink } from '../../types/UserTypes';
import { assertIsNode } from '../../utils/utils';
import SearchIcon from './SearchIcon';

type DrinkSearchBarProps = {
  drinks: Drink[];
};

function DrinkSearchBar(props: DrinkSearchBarProps) {
  const { drinks } = props;

  const searchRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchText, setSearchText] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Drink[]>([]);

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const suggestionClickedHandler = (name: string) => {
    setSearchText(name);
  };

  useEffect(() => {
    setSearchSuggestions(searchDrinksArray(searchText));
  }, [searchText]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (!formRef.current?.contains(event.target)) {
        setSearchSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const searchDrinksArray = (search: string) => {
    const s = search.toLowerCase();

    return drinks.filter((d) => d.strDrink.toLowerCase().includes(s));
  };

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  return (
    <form ref={formRef} onClick={focusSearch} className={styles.form}>
      <div className={styles.searchWrapper}>
        <input
          ref={searchRef}
          value={searchText}
          onChange={searchHandler}
          className={styles.searchBar}
          type="text"
          placeholder="Search for drink!"
        />
        <SearchIcon styles={{ width: '25px', fill: 'white' }} />

        {/* AUTOCOMPLETE / SEARCH SUGGESTIONS */}
        {searchText === '' || searchSuggestions.length === 0 ? (
          <></>
        ) : (
          <div className={styles.autocompleteWrapper}>
            {searchSuggestions.map((d) => (
              <div
                onClick={() => suggestionClickedHandler(d.strDrink)}
                className={styles.autocompleteOption}
                key={d.idDrink}
              >
                {d.strDrink}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}

export default DrinkSearchBar;
