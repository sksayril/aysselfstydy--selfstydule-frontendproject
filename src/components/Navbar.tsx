import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, BookOpen, BrainCircuit, Newspaper, Home, BookOpenCheck, FileText, History } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { Category, CategoryResponse, SubCategory, SubCategoryResponse } from '../types/category';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Record<string, SubCategory[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile bottom navigation items
  const mobileNavItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpenCheck, label: 'Quiz', path: '/quiz' },
    { icon: Newspaper, label: 'Blogs', path: '/blog' },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.notesmarket.in/api/categories/parents');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: CategoryResponse[] = await response.json();
        if (data[0]?.parents) {
          setCategories(data[0].parents);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchSubCategories = async (categoryId: string) => {
    if (subCategories[categoryId]) {
      return;
    }

    try {
      const response = await fetch(`https://api.notesmarket.in/api/categories/subcategories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data: SubCategoryResponse[] = await response.json();
      if (data[0]?.subcategories) {
        setSubCategories(prev => ({
          ...prev,
          [categoryId]: data[0].subcategories
        }));
      }
    } catch (err) {
      console.error('Error fetching subcategories:', err);
    }
  };

  const handleCategoryHover = (categoryId: string) => {
    setHoveredCategory(categoryId);
    fetchSubCategories(categoryId);
  };

  const handleSubItemClick = (subcategoryId: string) => {
    navigate(`/study-materials/${subcategoryId}`);
    setHoveredCategory(null);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const MobileNavButton = ({ to, icon: Icon, text, gradient }: { to: string; icon: React.ElementType; text: string; gradient: string }) => (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-white font-medium ${gradient} transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon size={20} />
      <span>{text}</span>
    </Link>
  );

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-green-500 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <button
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold">
                  <span className="text-white">Notes</span>
                  <span className="text-yellow-300">Market</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Main Categories */}
              <div className="flex space-x-1">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="relative group"
                    onMouseEnter={() => handleCategoryHover(category._id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <button className="text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center capitalize">
                      {category.name}
                      <ChevronDown size={16} className="ml-1" />
                    </button>

                    {/* Dropdown Menu */}
                    {hoveredCategory === category._id && subCategories[category._id] && (
                      <div className="absolute z-50 left-0 mt-0 w-64 bg-white rounded-lg shadow-lg py-2 animate-fadeIn">
                        <div className="grid grid-cols-1 gap-1 p-2">
                          {subCategories[category._id].map((subItem) => (
                            <button
                              key={subItem._id}
                              onClick={() => handleSubItemClick(subItem._id)}
                              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-sm text-left px-3 py-2 rounded-md transition-colors duration-150 capitalize"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop Additional Links */}
              <Link
                to="/blog"
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
              >
                <Newspaper size={18} />
                <span>Blog</span>
              </Link>
              <Link
                to="/quiz"
                className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
              >
                <BrainCircuit size={18} />
                <span>Quiz</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-bold">
                    <span className="text-blue-600">Self</span>
                    <span className="text-green-600">Studys</span>
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Action Buttons */}
                <div className="space-y-3 mb-6">
                  <MobileNavButton
                    to="/blog"
                    icon={Newspaper}
                    text="Blog"
                    gradient="bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                  <MobileNavButton
                    to="/quiz"
                    icon={BrainCircuit}
                    text="Quiz"
                    gradient="bg-gradient-to-r from-orange-500 to-red-500"
                  />
                </div>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Categories
                  </h3>
                  {categories.map((category) => (
                    <div key={category._id} className="border-b border-gray-100 last:border-b-0">
                      <button
                        className="text-gray-700 hover:text-blue-600 px-4 py-3 w-full text-left flex justify-between items-center capitalize font-medium"
                        onClick={() => handleCategoryHover(hoveredCategory === category._id ? null : category._id)}
                      >
                        {category.name}
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            hoveredCategory === category._id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Mobile Submenu */}
                      {hoveredCategory === category._id && subCategories[category._id] && (
                        <div className="bg-gray-50 px-2 py-1">
                          {subCategories[category._id].map((subItem) => (
                            <button
                              key={subItem._id}
                              onClick={() => handleSubItemClick(subItem._id)}
                              className="text-gray-600 hover:text-blue-600 text-sm w-full text-left px-4 py-2 rounded-md capitalize"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50 shadow-lg">
        <div className="grid grid-cols-3 w-full">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-2.5 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <div className={`${isActive ? 'relative' : ''}`}>
                  {isActive && (
                    <span className="absolute inset-0 bg-blue-100 rounded-full -m-1.5"></span>
                  )}
                  <Icon
                    size={22}
                    className={`relative ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
                  />
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Add padding to main content to account for bottom navigation on mobile */}
      <div className="md:hidden pb-16" />
    </>
  );
};

export default Navbar;
