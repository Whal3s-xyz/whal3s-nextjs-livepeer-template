import dynamic from 'next/dynamic'
import Button from "@/components/Button";
import React from "react";

const DynamicLogin = dynamic(() => import('./Login'), {
    ssr: false,
    loading: () => <Button
        isLoading={true}
        className=""
        onClick={() => {
        }}
    >Initializing</Button>,
})

export default DynamicLogin
