import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Detail from "./pages/detail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Detail />} />
        {/* 경로와 컴포넌트 순으로 작성 근데 :id로 동적라우팅 할수도 있음 */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
