import { AuthContext } from 'context/AuthContext';
import { useRouter } from 'hooks/useRouter';
import { useContext } from 'react';
import { SidebarElement } from 'router';

interface SideBarProps {
  sidebarContent: SidebarElement[];
}

const SideBar: React.FC<SideBarProps> = ({ sidebarContent }) => {
  const { currentPath, routeTo } = useRouter();
  const { token, logout } = useContext(AuthContext);

  const sidebarMenuClickHandler = (path: string) => {
    routeTo(path);
  };
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">ToDo</h2>
      <ul className="sidebar-list">
        {sidebarContent.map((element) => {
          return (
            <li
              key={element.path}
              className={
                currentPath === element.path
                  ? 'sidebar-menu current-sidebar-menu'
                  : 'sidebar-menu'
              }
              onClick={() => sidebarMenuClickHandler(element.path)}
            >
              {element.label}
            </li>
          );
        })}
      </ul>
      {token === null ? null : (
        <div
          onClick={() => {
            if (token !== null) {
              logout();
              routeTo('/signin');
            }
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default SideBar;
