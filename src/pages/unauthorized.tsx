import React from 'react';
import Layout from "@/components/Layout";
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

const Unauthorized = () => {
    return (
        <Layout header="">
            <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Unauthorized</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <p>
                                Autthentication is required to access this page.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Unauthorized;
