import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from '../../styles/searchBarStyles.module.scss';
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
  // HANDLE THIS IN PARENT COMPONENT TO FIX ISSUE WITH SEARCH RESULTS RESETING!!!!!!!!!!!!!!
  const [searchText, setSearchText] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Drink[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);

    if (e.currentTarget.value !== '' && searchSuggestions.length > 0) {
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

    if (searchSuggestions.length === 0) setShowSuggestions(false);
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
        <SearchIcon
          search={() => updateDrinkList(searchSuggestions)}
          styles={{ width: '25px', fill: '#202020', cursor: 'pointer' }}
        />

        {/* AUTOCOMPLETE / SEARCH SUGGESTIONS */}
        {showSuggestions && (
          <div className={styles.autocompleteWrapper}>
            {searchSuggestions.map((d) => (
              <div
                onClick={() => {
                  suggestionClickedHandler(d.strDrink);
                  updateDrinkList(searchDrinksArray(d.strDrink));
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
