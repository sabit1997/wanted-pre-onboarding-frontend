import SideBar from 'components/SideBar';
import { useRouter } from 'hooks/useRouter';
import { useCallback, useEffect } from 'react';
import { SidebarContent } from 'router';

interface GeneralLayoutProps {
  children: React.ReactNode;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const { routeTo } = useRouter();

  const hasToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      routeTo('/');
      return;
    }
  }, []);

  useEffect(() => {
    hasToken();
  }, [children]);

  return (
    <div className="general-layout">
      <SideBar sidebarContent={SidebarContent} />
      <div className="general-layout-body">{children}</div>
    </div>
  );
};

export default GeneralLayout;
