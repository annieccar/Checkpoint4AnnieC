import NavBar from "./components/Navbar";
import { CurrentUserContextProvider } from "./contexts/currentUserContext";
import Router from "./routes/Router";

function App() {
  return (
    <div className="bg-lightgray pb-12">
      <CurrentUserContextProvider>
        <NavBar />
        <Router />
      </CurrentUserContextProvider>
    </div>
  );
}

export default App;
