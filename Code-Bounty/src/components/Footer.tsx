
import React from 'react';
import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">OpenBounty</h2>
            <p className="text-gray-300 mb-4 max-w-md">
              A decentralized platform that rewards open source contributors with cryptocurrency for merged pull requests.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white flex items-center">
                  Documentation <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white flex items-center">
                  API <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white flex items-center">
                  Smart Contracts <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white flex items-center">
                  Tutorials <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} OpenBounty. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Built on Sepolia ETH
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
