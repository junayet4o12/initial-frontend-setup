import ConnectSocket from '@/components/Global/connect-socket';
import ChatApp from '@/components/Messages/ChatApp';
import React from 'react';

export default function page() {
  return (
    <div className='pt-24 lg:pt-40 bg-[#F9FAFB]'>
      <ConnectSocket />
      <ChatApp />
    </div>
  );
}