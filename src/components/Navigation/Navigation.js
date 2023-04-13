import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import logo from "../../assets/icons/logo.png";
import "./Navigation.scss";

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <Link to="/" className="nav__link nav__link--logo">
          <div className="nav__section-container">
            <img src={logo} alt="MemoVault" className="nav__logo" />
            <h1 className="nav__title">MemoVault</h1>
          </div>
        </Link>

        {!user && (
          <div className="nav__section-container">
            <Link className="paper-btn nav__link" to="/login">
              Login
            </Link>
            <Link className="paper-btn btn-success nav__link" to="/signup">
              Signup
            </Link>
          </div>
        )}

        {user && (
          <>
            <section className="nav__user">
              <Link className="nav__link" to="/followers">
                Find connections
              </Link>
              <Link className="nav__link" to="/followers/board">
                My connections
              </Link>
              <Link className="nav__link" to="/mood">
                Reflect
              </Link>
              <Link className="nav__link" to="/">
                <section className="loggedon-user">
                  <img
                    className="loggedon-user__img"
                    src={user.avatar}
                    alt="Logged on user."
                  />
                  <p className="loggedon-user__name">{user.email}</p>
                </section>
              </Link>
            </section>
            <button onClick={handleLogout}>Log out</button>{" "}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
