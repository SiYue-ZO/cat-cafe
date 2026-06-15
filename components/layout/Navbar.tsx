'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Cat, Coffee, Home, MessageSquare, User, Bot, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const navItems = [
  { label: '首页', href: '/', icon: Home },
  {
    label: '咖啡信息', href: '/menu', icon: Coffee,
    children: [
      { label: '全部商品', href: '/menu' },
      { label: '咖啡', href: '/menu?category=coffee' },
      { label: '饮品', href: '/menu?category=drink' },
      { label: '甜品', href: '/menu?category=dessert' },
    ],
  },
  {
    label: '猫咪信息', href: '/cats', icon: Cat,
    children: [
      { label: '全部猫咪', href: '/cats' },
      { label: '橘猫', href: '/cats?breed=橘猫' },
      { label: '布偶猫', href: '/cats?breed=布偶猫' },
      { label: '英短', href: '/cats?breed=英短' },
    ],
  },
  { label: '留言板', href: '/messages', icon: MessageSquare },
  { label: '个人中心', href: '/profile', icon: User },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-amber-600 font-bold text-xl shrink-0">
            <Cat size={28} />
            <span className="hidden sm:inline">喵星咖啡</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-600 hover:bg-amber-50 hover:text-amber-600'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                  {item.children && <ChevronDown size={14} />}
                </Link>
                {item.children && dropdownOpen === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link href="/ai" className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors">
              <Bot size={18} />
              <span className="hidden sm:inline">AI 助手</span>
            </Link>

            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">{user.username}</span>
                <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="退出登录">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-sm text-amber-600 hover:text-amber-700 font-medium">登录</Link>
                <Link href="/register" className="text-sm bg-amber-500 text-white px-3 py-1.5 rounded-xl hover:bg-amber-600 transition-colors">注册</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white">
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
                  isActive(item.href) ? 'bg-amber-50 text-amber-700' : 'text-gray-600'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  className="block pl-10 pr-4 py-2 text-sm text-gray-500 hover:text-amber-600"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href="/seckill"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-500"
          >
            限时秒杀
          </Link>
        </div>
      )}
    </nav>
  );
}
