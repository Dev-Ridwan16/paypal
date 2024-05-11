import React, {useEffect, useState} from 'react';
import { useSearchParams} from 'react-router-dom';
import axios from 'axios'

const url = 'http://localhost:4000/api';

export default function Success() {

    const [params] = useSearchParams();
    const [status, setStatus] = useState(null)

    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    const executeOrder = async(paymentId, payerId, pickup) => {
            if(!(paymentId && payerId)) return;

            setStatus('loading');
            try {
                const response = await axios.post(`${url}/pickup`, {
                    paymentId, 
                    payerId,
                    pickup: pickup
                })
                setStatus('success')
                console.log(response.data)
                // localStorage.removeItem('pickup')
            }catch(err) {
                setStatus('failed')
                console.log(err)
            }
    }
    
    useEffect(() => {
        const pickup = localStorage.getItem('pickup');
        executeOrder(paymentId, payerId, pickup)
    }, [params])

    return <>
        <h1 align="center">Success Payment</h1>
        { status == 'loading' && <h3 align="center" style={{color: '#333'}}>Loading...</h3> }
        { status == 'failed' && <h3 align="center" style={{color: 'red'}}>Failed</h3> }
        { status == 'success' && <h3 align="center" style={{color: 'teal'}}>Success</h3> }
    </>
};


export { Success };