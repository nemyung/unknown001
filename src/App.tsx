import { useAuth } from "./contexts/auth";

import Pages from "./pages/Pages";
import FakeLogin from "pages/login/FakeLogin";

function App() {
  const { isLoginned } = useAuth();
  return isLoginned ? <Pages /> : <FakeLogin />;
}

export default App;
