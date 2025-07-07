import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../URL/baseUrl';

const Packages = () => {
    const [packages, setPackages] = useState([]);
    useEffect(()=>{
        axios
      .get(`${baseUrl}/destinations`)
      .then((res) => {
        setPackages(res.data);
      })
      .catch();
    },[])
    return (
        <div>
            {packages.length}
        </div>
    );
};

export default Packages;