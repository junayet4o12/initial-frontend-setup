import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Send, Twitter, Linkedin } from 'lucide-react';
import logo from '@/assets/logo.png'
import Container from './Container';
import Subtitle from './Subtitle';

// Footer link sections
const footerLinks = [
  {
    title: 'Quick Links',
    links: ['Home', 'Browse Listings', 'Post a Listing', 'Contact'],
  },
  {
    title: 'Support',
    links: ['Privacy Policy', 'Help Center', 'Terms & Conditions'],
  },
  {
    title: 'Contact Info',
    links: ['email: overlandingoutpost@gmail.com'],
  },
];

const Footer = () => {
  return (
    <div className='bg-[#4A5A6A] px-2'>
      <Container className=' text-white relative overflow-hidden pb-10 lg:pb-0'>
        <div className='text-lg font-normal py-16 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
            <div className='lg:col-span-2 max-w-[440px]'>
              <Image
                src={logo}
                placeholder='blur'
                alt="Company Logo"
                width={200}
                height={200}
                className="rounded-full size-20 md:size-28 brightness-0 invert"
                priority
              />
              <Subtitle className='text-white'>The premier marketplace for custom vehicles,
                connecting enthusiasts worldwide.</Subtitle>
            </div>

            {/* Footer Links */}
            <div className='lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-10'>
              {footerLinks.map((section, index) => (
                <div key={index} className='flex flex-col space-y-4'>
                  <h1 className='text-base md:text-lg font-bold'>{section.title}</h1>
                  {section.links.map((link, i) => (
                    <Link href='/' key={i}>
                      <Subtitle className='text-white/80'>{link}</Subtitle>
                    </Link>
                  ))}

                  {/* Add Follow Us section for Contact Info */}
                  {section.title === 'Contact Info' && (
                    <div className="mt-4">
                      <Subtitle className="font-bold mb-2 text-white">Follow Us</Subtitle>
                      <p className="text-xs md:text-sm text-white/80 mb-3">
                        Follow us on social media for the latest deals and travel inspiration
                      </p>

                      {/* Social Media Icons */}
                      <div className="flex gap-3 text-[#1C1C1C] flex-wrap">
                        <Link href="#" className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center   transition-colors">
                          <Instagram size={16} />
                        </Link>
                        <Link href="#" className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center   transition-colors">
                          <Send size={16} />
                        </Link>
                        <Link href="#" className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center   transition-colors">
                          <Twitter size={16} />
                        </Link>
                        <Link href="#" className="w-8 h-8 bg-white/40 rounded-full flex items-center justify-center   transition-colors">
                          <Linkedin size={16} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='border-t border-[#707070]'>
          <p className='text-white/80 text-sm text-center py-8'>@ 2024 Overlanding Outpost. All rights reserved.</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;