import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  chosenTodo: Todo | null;
  setTodo: Dispatch<SetStateAction<Todo | null>>;
  setChosenUserId: Dispatch<SetStateAction<number>>;
  onShow: Dispatch<SetStateAction<boolean>>;
  isShown: boolean;
  setIsModalLoading: Dispatch<SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({
  todos,
  chosenTodo,
  setTodo,
  setChosenUserId,
  onShow,
  isShown,
  setIsModalLoading,
}) => {
  const findUser = (currentTodo: Todo) => {
    if (currentTodo.id === chosenTodo?.id) {
      return true;
    }

    return false;
  };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr key={todo.id} data-cy="todo" className="">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check"></i>
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={`has-text-${todo.completed ? 'success' : 'danger'}`}
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => {
                  setChosenUserId(todo.userId);
                  setTodo(todo);
                  onShow(true);
                  setIsModalLoading(true);
                  setTimeout(() => {
                    setIsModalLoading(false);
                  }, 1000);
                }}
              >
                <span className="icon">
                  <i
                    className={`far fa-eye${findUser(todo) && isShown ? '-slash' : ''}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
