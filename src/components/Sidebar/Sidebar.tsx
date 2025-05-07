import './Sidebar.scss';
import '../../index.scss';
import { links } from "../../data/data.tsx";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return <div className="sidebar">
    <div className="sidebar__logo-container">
      <p className="sidebar__logo-container__logo">Logistics</p>
      <p className="sidebar__logo-container__subtitle">Admin dashboard</p>
    </div>
    <nav className="sidebar__nav">
      {links.map(link => (
        <NavLink
          to={link.path}
          key={link.id}
          className={({ isActive }) => (
            isActive
              ? "sidebar__nav__item sidebar__nav__item--selected"
              : "sidebar__nav__item")}
        >
          <svg className="sidebar__nav__item__icon"  width="18" height="18">
            <use href={link.icon}/>
          </svg>
          <p className="sidebar__nav__item__title">{link.title}</p>
        </NavLink>
      ))}
    </nav>
  </div>
}

export default Sidebar;
