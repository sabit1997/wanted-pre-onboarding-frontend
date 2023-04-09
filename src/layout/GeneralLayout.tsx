import SideBar from 'components/SideBar';
import { SidebarContent } from 'router';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <div className="general-layout">
      <SideBar sidebarContent={SidebarContent} />
      <div className="general-layout-body">{children}</div>
    </div>
  );
};

export default GeneralLayout;
