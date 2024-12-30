import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="bg-white py-10 border-t border-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap">
          {/* Logo and Copyright Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2023. All Rights Reserved by CodeCanvas.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-900 hover:text-indigo-600" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
