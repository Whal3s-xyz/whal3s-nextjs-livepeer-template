import React from 'react';
import Navbar from "@/components/Navbar";

const Layout = (props:any) => {
    return (
        <div className="min-h-full">
            <Navbar/>
            <div className="py-10">
                {props.header && <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{props.header}</h1>
                    </div>
                </header>}

                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {props.children}
                    </div>
                </main>
            </div>
        </div>
    );
};


export default Layout;
