import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sprout,
  Activity,
  Droplets,
  Bug,
  TrendingUp,
  Settings,
  Menu,
  X,
  FileText
} from 'lucide-react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'لوحة القيادة', icon: LayoutDashboard },
    { path: '/sensors', label: 'المستشعرات', icon: Activity },
    { path: '/analysis', label: 'تحليل التربة', icon: Droplets },
    { path: '/crops', label: 'المحاصيل', icon: Sprout },
    { path: '/nutrients', label: 'التغذية', icon: Sprout }, // Reusing Sprout for now, could be Flask
    { path: '/diseases', label: 'الأمراض', icon: Bug },
    { path: '/yield', label: 'الإنتاجية', icon: TrendingUp },
    { path: '/reports', label: 'التقارير', icon: FileText },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-[#f5f5f1] text-slate-800 font-sans overflow-hidden" dir="rtl">

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-l border-slate-200 h-full">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <Sprout className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">AGRINOVA</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                      ? 'bg-teal-50 text-teal-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <NavLink to="/settings" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900">
            <Settings className="w-5 h-5" />
            <span>الإعدادات</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold">AGRINOVA</span>
          </div>
          <button onClick={toggleMenu} className="p-2 text-slate-600">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Navigation Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute inset-0 z-10 bg-white pt-20 px-4 pb-6 overflow-y-auto">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg text-lg ${isActive
                      ? 'bg-teal-50 text-teal-700 font-medium'
                      : 'text-slate-600 border border-slate-100'
                    }`
                  }
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}