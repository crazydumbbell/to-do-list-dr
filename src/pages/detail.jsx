import { useParams, useSearchParams, useNavigate } from "react-router-dom";
// useParams를 통해서 로컬호스트의 id값을 불러온다.
import { FiCheckSquare, FiTrash2, FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // 위에 객체 {}는 순서 x , 밑에[]는 순서 존재
  // TodoCard에서 쿼리스트링으로 넣은 주소의 값을 가져오는것.
  // ?뒤의 값이 쿼리스트링임
  const navigate = useNavigate();
  // 리디렉트하는법

  const title = searchParams.get("title");
  const isDone = searchParams.get("is-done");
  // 주소열에서 받아온 값

  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  const onClickEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const onSubmitEdit = (e) => {
    e.preventDefault();

    if (!editTodo) return;

    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);
    // 배열이므로 파싱...

    const updatedTodos = parsedTodos.map((v) => {
      if (v.id == +id) {
        return { id: v.id, title: editTodo, isDone: v.isDone };
      } else {
        return v;
      }
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
    // 메인페이지로 리디렉트
  };

  const onClickIsDone = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);
    // 배열이므로 파싱...

    const updatedTodos = parsedTodos.map((v, i) => {
      if (v.id == id) {
        return { id: v.id, title: v.title, isDone: !v.isDone };
      } else {
        return v;
      }
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    navigate("/");
    // 메인페이지로 리디렉트
  };

  const onClickDel = () => {
    const localTodos = localStorage.getItem("todos");

    if (!localTodos) return;

    const parsedTodos = JSON.parse(localTodos);

    const deletedTodos = parsedTodos.filter((v) => {
      if (v.id !== +id) {
        return v;
      }
    });

    if (deletedTodos.length === 0) {
      localStorage.removeItem("todos");
    } else {
      localStorage.setItem("todos", JSON.stringify(deletedTodos));
    }

    // 이거는 리스트 전부 삭제했을때 빈배열이 들어가서 오류떠서 그럼
    // 길이가 0이면(빈배열) -> 아예 todos를 삭제
    navigate("/");
  };

  useEffect(() => console.log(isDone), []);
  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center">
      <span>{id}</span>
      <span className="ml-4">
        {isEdit ? (
          <form className="flex" onSubmit={onSubmitEdit}>
            <input
              className=""
              type="text focus:outline-none focus:border-blue-300 mr-3 px-2 py-1"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
            <input className="hover:font-bold" type="submit" value="확인" />
          </form>
        ) : (
          title
        )}
      </span>
      <button
        onClick={onClickIsDone}
        className="bg-green-400 hover:bg-green-600 active:bg-green-400 rounded-md px-2 h-10 flex justify-center items-center ml-4"
      >
        <FiCheckSquare /> {isDone === "true" ? "완료취소" : "완료"}
      </button>
      <button
        onClick={onClickEditToggle}
        className="bg-blue-400 hover:bg-blue-600 active:bg-blue-400 rounded-md px-2 h-10 flex justify-center items-center ml-4"
      >
        <FiEdit /> {isEdit ? "취소" : "수정"}
      </button>
      <button
        onClick={onClickDel}
        className="bg-red-400 hover:bg-red-600 active:bg-red-400 rounded-md px-2 h-10 flex justify-center items-center ml-4"
      >
        <FiTrash2 />
        삭제
      </button>
    </div>
  );
};

export default Detail;
