import { useEffect } from "react";
import { Link } from "react-router-dom";

const TodoCard = ({ todo }) => {
  useEffect(() => console.log(todo), []);

  return (
    <li
      className={`h-12 flex items-center text-xl ${
        todo.isDone && "line-through"
      }`}
    >
      <span className="w-1/12 text-right">{todo.id}</span>
      <span className="w-8/12 pl-2">👩‍💻{todo.title}</span>
      <Link
        to={`/${todo.id}?title=${todo.title}&is-done=${todo.isDone}`}
        className="w-3/12 hover:font-bold"
      >
        Detail
      </Link>
      {/* {todo.isDone && (
        <div className="w-full border-b-4 border-black absolute bottom-6"></div>
      )} 이거는 전체밑줄 긋는법*/}
    </li>

    // 맵함수는 컴포넌트 반복문
    // 순서에 접근하는것은 v의 id이므로 v.id를 중괄호로 감싸면됨
    // 컴포넌트화 하면서 v -> todo로 바꾸고 붙어있던 key ={i}를 메인에 넣기
    // todo는 프롭스
    // Link에 동적라우팅 링크 넣으려먼 {``} + 위에 링크 임포트 해줘야됨
  );
};
export default TodoCard;
