import { useRouter } from 'hooks/useRouter';
import { SidebarElement } from 'router';

interface SideBarProps {
  sidebarContent: SidebarElement[];
}

const SideBar: React.FC<SideBarProps> = ({ sidebarContent }) => {
  const { currentPath, routeTo } = useRouter();

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
              className="sidebar-menu"
              onClick={() => sidebarMenuClickHandler(element.path)}
            >
              {element.label}
            </li>
          );
        })}
      </ul>
      <div
        onClick={() => {
          if (localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
            routeTo('/signin');
          }
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default SideBar;
