import { updateTodo } from 'api/todo';
import { Todos } from 'pages/Todo';
import React, { SetStateAction } from 'react';
interface ModalProps {
  editTodo: Todos;
  setEditModal: React.Dispatch<SetStateAction<boolean>>;
  setEditTodo: React.Dispatch<SetStateAction<Todos>>;
}

export default function Modal({
  editTodo,
  setEditModal,
  setEditTodo,
}: ModalProps) {
  const cancelButtonHandler = () => {
    setEditModal(false);
  };

  const editButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editTodoResult = await updateTodo(editTodo.id, {
      isCompleted: editTodo.isCompleted,
      todo: editTodo.todo,
    });
    setEditModal(false);
  };

  const editInputHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setEditTodo((prev) => ({ ...prev, todo: value }));
  };

  return (
    <div className="edit-form-box">
      <form className="edit-form" onSubmit={editButtonHandler}>
        <input
          name="edit-task"
          type="text"
          className="todo-edit-input"
          value={editTodo.todo}
          onChange={editInputHandler}
        />
        <button type="submit" className="todo-submit-button">
          완료
        </button>
        <button
          type="button"
          className="todo-submit-button"
          onClick={cancelButtonHandler}
        >
          취소
        </button>
      </form>
    </div>
  );
}
