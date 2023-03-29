import React from 'react';
import DynamicLogin from "@/components/Login/DynamicLogin";
import Navbar from "@/components/Navbar";

// @ts-ignore
const Layout = ({children, header}) => {
    return (
        <div className="min-h-full">
            <Navbar/>
            <div className="py-10">
                {header && <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{header}</h1>
                    </div>
                </header>}

                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
