import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from '../../styles/drinkStyles/searchBarStyles.module.scss';
import { Drink } from '../../types/UserTypes';
import { assertIsNode } from '../../utils/utils';
import SearchIcon from './SearchIcon';

type DrinkSearchBarProps = {
  drinks: Drink[];
  updateDrinkList: (drinks: Drink[]) => void;
  searchText: string;
  setSearchTextHandler: (s: string) => void;
  toggleModal: (drink: Drink | null) => void;
  modalIsShowing: boolean;
};

function DrinkSearchBar(props: DrinkSearchBarProps) {
  const { drinks, searchText, setSearchTextHandler, updateDrinkList, toggleModal, modalIsShowing } = props;

  const searchRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // HANDLE THIS IN PARENT COMPONENT TO FIX ISSUE WITH SEARCH RESULTS RESETING!!!!!!!!!!!!!!
  const [searchSuggestions, setSearchSuggestions] = useState<Drink[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTextHandler(e.currentTarget.value);

    if (e.currentTarget.value !== '' && searchSuggestions.length > 0) {
      setShowSuggestions(true);
    } else {
    }
  };

  const suggestionClickedHandler = (name: string) => {
    setSearchTextHandler(name);
    if (modalIsShowing) toggleModal(null);
  };

  const searchDrinksArray = (search: string) => {
    const s = search.toLowerCase();

    return drinks.filter((d) => d.name.toLowerCase().includes(s));
  };

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateDrinkList(searchSuggestions);
    setShowSuggestions(false);

    if (modalIsShowing) toggleModal(null);
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
                  suggestionClickedHandler(d.name);
                  updateDrinkList(searchDrinksArray(d.name));
                  setShowSuggestions(false);
                }}
                className={styles.autocompleteOption}
                key={d.id}
              >
                {d.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}

export default DrinkSearchBar;
