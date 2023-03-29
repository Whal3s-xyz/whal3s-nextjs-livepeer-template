import React from 'react';
import Button from "@/components/Button";

const Uninitialized = () => {

    //Nothing to do here, utility initializes itself
    return (
        <Button
            isLoading={true}
            className=""
            onClick={() => {}}
           >Initializing</Button>
    );
};

export default Uninitialized;
