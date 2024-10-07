import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
    { title: 'All Products', link: '/' },
    { title: 'Upload', link: '/upload' },
    { title: 'Orders', link: '/orders' },
];

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    
    return (
        <nav className="fixed bg-white navbar relative h-16 shadow-xl text-black z-100 w-full">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
                {/* logo */}
                <Link to="/" className="flex items-center gap-3">
                    <h1 className='text-2xl'>Anabeya Collections</h1>
                </Link>
                <div className="flex items-center space-x-4">
    

                    <button className="menu-icon z-50 lg:hidden">
                        {showNavbar ? (
                            <X size={28} onClick={handleShowNavbar} className=""  />
                        ) : (
                            <>
                               <div className="flex gap-5">

                                <Menu size={28} onClick={handleShowNavbar} className="" />
                               </div>
                            </>
                        )}
                    </button>

                </div>
                <div
                    className={`nav-elements navbar bg-white text-black fixed inset-0 z-40 h-screen w-screen transform transition-transform duration-300 ease-in-out lg:relative lg:right-auto lg:top-auto lg:h-auto lg:w-auto lg:translate-x-0 lg:bg-transparent ${showNavbar ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <ul className="mt-16 flex flex-col space-y-8 px-6 py-6 lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0 lg:px-0 text-center">
                        {navLinks.map(({ title, link }, index) => (
                            <li key={index} className="group">
                                <Link
                                    to={link}
                                    className="relative p-2 text-lg font-medium transition-all duration-300 ease-in-out hover:text-blue-600 lg:text-base"
                                    onClick={() => setShowNavbar(false)} // Close the navbar on link click
                                >
                                    {title}
                                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
