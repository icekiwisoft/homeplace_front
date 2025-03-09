import React from 'react';
import Nav from '../../components/Header/Nav/Nav';
import Footer from '../../components/Footer/footer';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Contact(): React.ReactElement {
  return (
    <>
      <Nav />
      
      {/* Hero Section with Background */}
      <div className="relative w-full h-[300px] bg-[url(@assets/bg_img/img10.png)] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <div className="flex items-center text-white">
            <a href="/" className="hover:text-[#EA7D00] transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-[#EA7D00]">Contact</span>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-[190px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Form */}
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#0D2E4F] mb-6">Send us an E-mail</h2>
              
              <form className="space-y-6">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full border-b border-gray-300 py-2 px-1 outline-none focus:border-[#EA7D00] transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    className="w-full border-b border-gray-300 py-2 px-1 outline-none focus:border-[#EA7D00] transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full border-b border-gray-300 py-2 px-1 outline-none focus:border-[#EA7D00] transition-colors"
                  />
                </div>
                
                <div>
                  <textarea 
                    placeholder="Enter Your Message" 
                    rows={4}
                    className="w-full border-b border-gray-300 py-2 px-1 outline-none focus:border-[#EA7D00] transition-colors resize-none"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="bg-[#EA7D00] text-white py-3 px-8 rounded-sm hover:bg-[#d67100] transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="w-full">
              <h2 className="text-3xl font-bold text-[#0D2E4F] mb-6">Howdy! Say hello</h2>
              
              <p className="text-[#989898] mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                magna aliqua. Quis ipsum suspendisse ultrices gravida. Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-[#EA7D00]">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <p className="text-[#989898]">Yaoundé mendong</p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-[#EA7D00]">
                    <FaPhone size={20} />
                  </div>
                  <p className="text-[#989898]">+237 05 58 09 20</p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-[#EA7D00]">
                    <FaEnvelope size={20} />
                  </div>
                  <p className="text-[#989898]">contact@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="w-full h-[400px] bg-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.36958423998!2d11.447786608203123!3d3.8480523000000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7a309a7977%3A0x7f54bad35e693c51!2sYaound%C3%A9!5e0!3m2!1sen!2scm!4v1651851325916!5m2!1sen!2scm" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
      
      <Footer />
    </>
  );
} 