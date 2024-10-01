/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Options } from './types/Options';

const getFilteredTodos = (
  todos: Todo[],
  option: Options,
  query: string,
): Todo[] => {
  let filteredData = todos;

  filteredData = filteredData.filter(filterTodo =>
    filterTodo.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (option === Options.Active) {
    filteredData = filteredData.filter(checkTodo => !checkTodo.completed);
  }

  if (option === Options.Completed) {
    filteredData = filteredData.filter(checkTodo => checkTodo.completed);
  }

  return filteredData;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState<Options>(Options.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(data => {
      setLoading(false);

      setTodos(data);
    });
  }, []);

  const filteredTodos = getFilteredTodos(todos, option, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setOption={setOption}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                todos={filteredTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
