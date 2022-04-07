import { To } from "history";
import { NavLink } from "remix";

type MainNavLinkProps = {
  children?: string | JSX.Element;
  to: To;
};

function MainNavLink({
  to,
  children,
  ...props
}: MainNavLinkProps): JSX.Element {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block border-b p-4 text-slate-700 text-xl ${
          isActive ? "bg-white" : "hover:bg-gray-100"
        }`
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}

export function MainNav() {
  return (
    <div className="h-full w-80 border-r bg-gray-50 overflow-y-auto">
      <div className="uppercase text-slate-500 px-4 py-2 text-sm border-b">
        Material
      </div>
      <MainNavLink to="articles">Artikel</MainNavLink>
      <MainNavLink to="categories">Kategorien</MainNavLink>
    </div>
  );
}
