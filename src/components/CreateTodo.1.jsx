import { useState } from "react";

export const CreateTodo = ({ todos }) => {
  const [newTodo, setNewTodo] = useState("");

  const onSubmitNewTodo = (e) => {
    e.preventDefault();

    if (!newTodo) return;
    //   입력한 값이 없으면 실행 x
    const newTodos = [...todos, { id: 1, title: newTodo, isDone: false }];
    //  ...은 전개구문 기존 ...todos에 새로운것을 넣고 배열로 감싸기
    // 그 새로운게 {}안에 들어있는거임...
    localStorage.setItem("todos", JSON.stringify(newTodos));
    // setItem은 로컬스토리지에 값을 담을때
    // 배열을 문자열화 해서 담아야 하므로 JSON.stringify화 해서 담음
  };

  return (
    <form
      className="bg-purple-200 w-96 mx-auto mt-12 flex "
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="w-3/4 mr-4 rounded-md p-2 focus:outline-none border-2 focus:border-blue-300"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <input
        className="w-1/4 bg-blue-400 hover:bg-blue-600 active:bg-blue-400 rounded-md text-white font-semibold"
        type="submit"
        value="생성"
      />
    </form>
  );
};
