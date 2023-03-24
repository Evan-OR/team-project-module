import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from '../../styles/searchBarWrapper.module.scss';
import { Drink } from '../../types/UserTypes';
import { assertIsNode } from '../../utils/utils';
import SearchIcon from './SearchIcon';

type DrinkSearchBarProps = {
  drinks: Drink[];
  updateDrinkList: (drinks: Drink[]) => void;
};

function DrinkSearchBar(props: DrinkSearchBarProps) {
  const { drinks, updateDrinkList } = props;

  const searchRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchText, setSearchText] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Drink[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);

    if (e.currentTarget.value !== '') {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const suggestionClickedHandler = (name: string) => {
    setSearchText(name);
  };

  const searchDrinksArray = (search: string) => {
    const s = search.toLowerCase();

    return drinks.filter((d) => d.strDrink.toLowerCase().includes(s));
  };

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDrinkList(searchSuggestions);
  };

  useEffect(() => {
    setSearchSuggestions(searchDrinksArray(searchText));

    // // If searachText is an empty string then show all drinks again
    if (searchText === '') {
      updateDrinkList(drinks);
    }
  }, [searchText]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      assertIsNode(event.target);
      if (!formRef.current?.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <form onSubmit={handleSubmit} ref={formRef} onClick={focusSearch} className={styles.form}>
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
        {showSuggestions && (
          <div className={styles.autocompleteWrapper}>
            {searchSuggestions.map((d) => (
              <div
                onClick={() => {
                  suggestionClickedHandler(d.strDrink);
                  updateDrinkList(searchSuggestions);
                  setShowSuggestions(false);
                }}
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
