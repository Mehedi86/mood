import { NavLink } from 'react-router-dom';
import useAuthInfo from '../hooks/useAuthInfo';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, setUser } = useAuthInfo();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('phone', null)
    setUser(null);
  };


  const navLinks = (
    <>
      <NavLink to="/" className="hover:underline">Home</NavLink>
      {user && <NavLink to="/mood-history" className="hover:underline">Mood History</NavLink>}
      {user && <NavLink to="/soft-delete" className="hover:underline">Recycle Bin</NavLink>}
    </>
  );

  const userAvatar = (
    <img
      src={user?.photoURL || "/default-user.png"}
      alt="User"
      className="w-8 h-8 rounded-full object-cover"
      onError={(e) => (e.currentTarget.src = "/user.jpg")}
    />
  );

  return (
    <div className="bg-[#2a2525] text-white">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4 flex-wrap">
        <div className="flex items-center gap-2">
          <img className="w-10 h-10 rounded-full" src="/icon.png" alt="Logo" />
          <h1 className="text-2xl font-bold">Mood</h1>
        </div>

        {/* Hamburger Toggle */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">{navLinks}</div>

        {/* User Info Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-2">
              {userAvatar}
              <span className="text-sm">{user.displayName || "User"}</span>
              <button onClick={handleLogout} className="text-sm font-medium hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login" className="text-sm hover:underline">Login</NavLink>
              <NavLink to="/register" className="text-sm hover:underline">Register</NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-[#2a2525]">
          <div className="flex flex-col space-y-2">{navLinks}</div>
          <div className="pt-2 border-t border-gray-600">
            {user ? (
              <div className="flex items-center gap-2 mt-2">
                {userAvatar}
                <span>{user.displayName || "User"}</span>
                <button onClick={handleLogout} className="ml-auto text-sm hover:underline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4 mt-2">
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
