"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FaList, FaPlus, FaEnvelope } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FaHome, FaTachometerAlt } from 'react-icons/fa';
import logo from '@/assets/logo.png'
import Container from './Container';
import { MessageCircle } from 'lucide-react';



import { useAppSelector } from '@/redux/store';
import { useCurrentUser } from '@/redux/authSlice';
import NavProfile from './NavProfile';

const Navbar = () => {
    const userData = useAppSelector(useCurrentUser);
    const pathname = usePathname();
    const isLogIn = !!userData;

    const navContent = [
        { name: 'Home', path: '/', icon: FaHome },
        { name: 'Browse Listings', path: '/browse-listings', icon: FaList },
        { name: 'Post a Listing', path: '/post-listing', icon: FaPlus },
        ...(isLogIn ? [{ name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt }] : []),
        { name: 'Contact', path: '/contact', icon: FaEnvelope },
    ];

    const mobileNavContent = [
        { name: 'Home', path: '/', icon: FaHome },
        { name: 'Post a Listing', path: '/post-listing', icon: FaPlus },
        { name: 'Browse Listings', path: '/browse-listings', icon: FaList, isCenter: true },
        ...(isLogIn ? [{ name: 'Dashboard', path: '/dashboard', icon: FaTachometerAlt }] : []),
        { name: 'Contact', path: '/contact', icon: FaEnvelope },
    ];


    return (
        <>
            <nav className="fixed z-50 w-full top-0 bg-white shadow-sm">
                <Container>
                    <div className="flex justify-between items-center py-2 lg:py-0">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
                            <Image
                                src={logo}
                                placeholder='blur'
                                alt="Company Logo"
                                width={200}
                                height={200}
                                className="rounded-full size-16 lg:size-28"
                                priority
                            />
                        </Link>

                        {/* Navigation links (hidden on mobile) */}
                        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                            {navContent.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.path}
                                    className={cn(
                                        "relative px-4 py-2 text-sm xl:text-base transition-all duration-300 rounded-lg group",
                                        pathname === link.path
                                            ? 'font-semibold text-primary bg-blue-50'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
                                    )}
                                >
                                    {link.name}
                                    {pathname === link.path && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Actions (Sign In / Sign Up) */}
                        <div className="flex items-center gap-2 lg:gap-3">
                            {isLogIn ? <>
                                <Link href={'/messages'}>
                                    <div className='size-9 min-w-9 rounded-full bg-gradient-to-br from-[#21D1F7] to-[#2196F3] text-white flex justify-center items-center'>
                                        <MessageCircle fill='white' className='ml-0.5 mb-0.5' />
                                    </div>
                                </Link>

                                <NavProfile />
                            </> : <>
                                <Link href="/auth/sign-in">
                                    <Button variant="outline" className="h-11 px-3">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/auth/sign-up">
                                    <Button className="h-11 px-3">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>}
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Mobile Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200">
                <Container className="py-1">
                    <div className={`grid ${isLogIn ? 'grid-cols-5' : 'grid-cols-4'}`}>
                        {/* Navigation items */}
                        {mobileNavContent.map((link, idx) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.path;
                            const isHome = link.path === '/';
                            const isCenter = link.isCenter;

                            return (
                                <Link
                                    key={idx}
                                    href={link.path}
                                    className={cn(
                                        "flex flex-col items-center justify-center py-2 px-2 transition-all duration-300 rounded-lg min-w-0 relative",
                                        isHome ? "bg-gray-100 hover:bg-gray-200 rounded-2xl mx-1" : "",
                                        isCenter ? "bg-gray-100 hover:bg-gray-200 rounded-2xl mx-1 border border-gray-300" : ""
                                    )}
                                >
                                    <div className="relative">
                                        <Icon className={cn(
                                            "w-4 h-4 mb-1 transition-all duration-300",
                                            isHome && isActive ? 'w-5 h-5' : '',
                                            isCenter ? 'w-5 h-5' : '',
                                            isActive ? 'text-primary' : 'text-gray-500',
                                            isCenter && !isActive ? 'text-gray-600' : ''
                                        )} />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-medium truncate transition-all duration-300 text-center",
                                        isActive ? 'text-primary font-semibold' : 'text-gray-500',
                                        isCenter && !isActive ? 'text-gray-600 font-semibold text-[10px]' : '',
                                        link.name === 'Browse Listings' ? 'text-[10px]' : '',
                                        link.name === 'Post a Listing' ? 'text-[10px]' : ''
                                    )}>
                                        {link.name === 'Browse Listings' ? 'Browse' :
                                            link.name === 'Post a Listing' ? 'Post' :
                                                link.name}
                                    </span>
                                    {isActive && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Navbar;