import { Outlet, NavLink } from "react-router-dom";
import css from "./AppLayout.module.scss";
import IconCheck from "~/assets/checkmark.svg?react";

export default function AppLayout() {
  return (
    <div className={css.root}>
      <nav className={css.nav}>
        <IconCheck className={css.nav__logo} />
        <NavLink to="/" className={css.nav__link}>
          Home
        </NavLink>
        <NavLink to="/about" className={css.nav__link}>
          About
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
