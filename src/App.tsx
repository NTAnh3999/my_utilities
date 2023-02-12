import { Routes, Route } from "react-router-dom";
import NavbarView from "./containers/NavbarView";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";

function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<NavbarView />}>
        <Route index element={<Home />} />
        <Route path="/todo-list" element={<TodoList />} />
      </Route>
    </Routes>
  );
}

export default App;
