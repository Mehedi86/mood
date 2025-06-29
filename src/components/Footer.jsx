import React from 'react';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className='bg-neutral-800'>
            <div className='md:h-60 w-full text-gray-200 px-12 py-12'>
                <div className='grid md:grid-cols-3'>
                    {/* left */}
                    <div>
                        <div className='text-white flex gap-2 items-center'>
                            <img className='w-12' src="/logo.avif" alt="" />
                            <h1 className='font-semibold text-2xl'>MatrimonySite</h1>
                        </div>
                        <div>
                            <h1>Bangladeshi matrimony website</h1>
                            <p>Dhaka, 1700</p>
                            <p>Bangladesh</p>
                        </div>
                    </div>
                    {/* middle */}
                    <div>
                        <h1 className='text-2xl font-semibold'>Contact Info</h1>
                        <div className='py-2 space-y-0.5'>
                            <p className='flex items-center gap-2'><IoPhonePortraitOutline /> 65446465456</p>
                            <p className='flex items-center gap-2'><MdEmail /> matrimonyBD.com</p>
                            <p className='flex items-center gap-2'><FaSquareWhatsapp /> 654415454</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-center py-4 text-gray-200'>@All Rights Reserved MetrimonySite BDL</p>
        </div>
    );
};

export default Footer;