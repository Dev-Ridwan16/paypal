import React, {useEffect, useState} from 'react';
import axios from 'axios';

const url = 'http://localhost:5000/api';

export default function Home() {
    const [loading, load] = useState(false);

    const pickup = {
        deliveryLocation: {
          longitude: '-13.284',
          latitude: '9.47294',
          address: 'Dont ask me'
        },
        deliveryDateTime: {
          date: '26/04/2024',
          time: '06:35'
        },
        deliveryTimeRange: {
          from: '08:00',
          to: '09:20'
        },
        recipient: {
          name: 'Eshebi Collins',
          email: 'oyetikh@gmail.com',
          phone: '+2349038441303'
        },
        message: 'Handle with care abeg'
    }

    useEffect(() => {
        const storage = localStorage.getItem('pickup');
        !storage && localStorage.setItem('pickup', JSON.stringify(pickup));  
    }, [])

    const initiatePayment = async() => {
        try {
            load(true)
            const response = await axios.post(`${url}/pickup/initiate-payment`, {
              amount: 2100,
              pickup: JSON.stringify(pickup)
            });
            window.location.href = response.data
        }catch(err) {
            console.log(err)
        }
        load(false)
    }
    return <>
        <h1 align="center">Initiate Payment</h1>
        <div style={{display: 'flex', justifyContent: 'center', padding: '20px 0'}}>
            <button onClick={initiatePayment}>Initiate</button>
            { loading && <div>Loading....</div> }
        </div>
    </>
};


export { Home };