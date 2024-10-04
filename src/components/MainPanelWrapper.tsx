import { FC } from "react";

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='w-full min-h-screen sm:rounded-b-3xl sm:border sm:border-[#EAAD2A] rounded-0 sm:rounded-3xl bg-[#161616] flex flex-col items-start justify-start pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-10 2xl:pt-12 3xl:pt-14'>
        {children}
    </div>
  );
};

export default Wrapper;