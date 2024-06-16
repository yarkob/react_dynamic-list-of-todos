/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Options } from './types/Options';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [chosenUserId, setChosenUserId] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [option, setOption] = useState<Options>(Options.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos().then(data => {
      setLoading(false);

      let filteredData = data;

      filteredData = filteredData.filter(filterTodo =>
        filterTodo.title.toLowerCase().includes(query.toLowerCase()),
      );

      if (option === Options.Active) {
        filteredData = filteredData.filter(checkTodo => !checkTodo.completed);
      }

      if (option === Options.Completed) {
        filteredData = filteredData.filter(checkTodo => checkTodo.completed);
      }

      setTodos(filteredData);
    });

    if (chosenUserId) {
      getUser(chosenUserId).then(data => setUser(data));
    }
  }, [chosenUserId, option, query]);

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
                chosenTodo={todo}
                setTodo={setTodo}
                setChosenUserId={setChosenUserId}
                todos={todos}
                onShow={setIsShown}
                isShown={isShown}
                setIsModalLoading={setIsModalLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {isShown && (
        <TodoModal
          todo={todo}
          user={user}
          isModalLoading={isModalLoading}
          onShow={setIsShown}
        />
      )}
    </>
  );
};
