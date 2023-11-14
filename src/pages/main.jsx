import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo";
import TodoCard from "../components/TodoCard";

const Main = () => {
  const [todos, setTodos] = useState([]);
  // useState안에 빈배열이라도 넣어놓는다. 빈값 x
  // setTodos를 통해 값을 입력 받아오고 기존todos에 newTodo적용
  // 그러기 위해선 CreateTodo를 씀

  // 로컬스토리지로부터 읽어오는 함수
  // setTodos를 통해 todos에 저장
  const [lastTodoId, setLastTodoId] = useState(0);

  const getTodos = () => {
    const localTodos = localStorage.getItem("todos"); //getItem안에는 키값만 있으면되겠네 //

    if (!localTodos) return;

    const parseTodos = JSON.parse(localTodos);
    /*localTodos를 다시 파싱해서(왜냐면 로컬에 문자열화해서 저장했으므로) 
    JSON포맷으로 setTodos에 저장 그리고 2번이상 사용하기위해 함수화*/
    setTodos(parseTodos);
    // Todolist를 갱신하는 함수

    setLastTodoId(parseTodos[parseTodos.length - 1].id);
  };
  // 맨끝 문자열에서 1빼면 그 문자열 순서이므로 그 값의 id를 추출하면됨
  // 여기 -1때문에 배열의 길이가 0에 -1 해버리면 id가 존재하지 않는 음수값이므로
  // 버그가 발생하는것 즉 detail컴포넌트의 onClickDel함수에서 아예 없애버려야됨

  useEffect(() => {
    getTodos();
  }, []);
  //   useEffect의 의존성 배열을 비워놓으면 첫랜더링때 한번만 실행됨

  return (
    <main className="min-h-screen max-w-screen-md mx-auto">
      <h1 className="text-center text-4xl font-bold h-[136px] flex justify-center items-center">
        To do list
      </h1>
      <CreateTodo todos={todos} getTodos={getTodos} lastTodoId={lastTodoId} />
      {/* 프롭스로 위의 todos를 내려받은 작업 앞의값은 key 뒤는 value value는 위의 useState의 todos를 가져온거고 
      key는 이 값을 todos라는 이름으로 사용하겠다고 선언한것 자식에게 물려주기 */}
      <ul className="w-96 mx-auto mt-12 h-[30rem] overflow-y-auto">
        {/* 여기서 flex를 안줘야 밑에 스크롤 기능을 구현할수 있음 */}
        {/* 테일윈드는 96까지밖에 없어서 그 이상을 넣으려면 rem을 써야됨 */}
        {/* overflow-y-auto하면 넘쳐나는 칸들이 넘치지않고 스크롤이 생긴다 */}
        {todos.length === 0
          ? "비어있을때"
          : todos.map((v, i) => {
              return <TodoCard key={i} todo={v} />;
            })}
      </ul>
    </main>
  );
};
export default Main;
