import { useAuth } from "./contexts/auth";

import Pages from "./pages/Pages";
import FakeLogin from "pages/login/FakeLogin";

function App() {
  const { isLogin } = useAuth();
  return isLogin ? <Pages /> : <FakeLogin />;
}

export default App;
