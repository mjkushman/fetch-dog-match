import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home";

function App() {
  return (
    <RequireAuth>
      <Home />
    </RequireAuth>
  );
}

export default App;
