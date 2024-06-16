import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Options } from '../../types/Options';

interface Props {
  setOption: Dispatch<SetStateAction<Options>>;
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({ setOption, query, setQuery }) => {
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'all') {
      setOption(Options.All);
    }

    if (event.target.value === 'active') {
      setOption(Options.Active);
    }

    if (event.target.value === 'completed') {
      setOption(Options.Completed);
    }
  };

  const onInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onChangeHandler}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={onInputHandler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
