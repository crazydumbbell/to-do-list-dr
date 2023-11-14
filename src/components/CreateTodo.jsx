import { useState } from "react";

const CreateTodo = ({ todos, getTodos, lastTodoId }) => {
  const [newTodo, setNewTodo] = useState("");

  const onSubmitNewTodo = (e) => {
    e.preventDefault();
    // 클릭때마다 새로고침 방지 기능 prevent
    if (!newTodo) return;
    //   입력한 값이 없으면 실행 x
    const newTodos = [
      ...todos,
      { id: lastTodoId + 1, title: newTodo, isDone: false },
    ];
    //  ...은 전개구문 기존 ...todos에 새로운배열을 넣은것 앞에 ...이 큰배열이고 {}가 추가된 작은 배열
    // 그 새로운게 {}안에 들어있는거임...
    // 불린형 함수는 앞에 is가 붙는게 특징
    localStorage.setItem("todos", JSON.stringify(newTodos));
    // setItem은 로컬스토리지에 값을 담을때
    // getItem은 로컬스토리지로부터 값을 불러올때
    // 배열을 문자열화 해서 담아야 하므로 JSON.stringify화 해서 담음
    // 나중에 그 값을 꺼내올때 쓸 key값이 "todos"로 지정한것
    getTodos();
    setNewTodo("");
    // 입력후 입력칸 청소
  };

  return (
    <form
      className="w-96 mx-auto mt-12 flex "
      onSubmit={onSubmitNewTodo}
      //   위에 저장한onSubmitNewTodo값을 onSubmit에 담기
    >
      <input
        className="w-3/4 mr-4 rounded-md p-2 focus:outline-none border-2 focus:border-blue-300"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        //   value는 값을 받기(중괄호는 받을놈)와onChange는 입력받은 값을 컨트롤
      />
      <input
        className="w-1/4 bg-blue-400 hover:bg-blue-600 active:bg-blue-400 rounded-md text-white font-semibold"
        type="submit"
        value="생성"
      />
    </form>
  );
};

export default CreateTodo;
