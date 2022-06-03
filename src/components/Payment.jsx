import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import axios from 'axios';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/payment.css"
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider'
import CheckoutProduct from './CheckoutProduct';
import Header from './Header'
import {db} from "../firebase"

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [successed, setSuccessed] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
    useEffect(() => {
        // generate the special stripe secret  which allows us to change a customer 
        const getClientSecrete = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total in a currenceies subunits
                url: `/payment/create?tottal = $={getBasketTotal(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)

        }
        getClientSecrete();
    }, [basket])

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // do all for fancy  strips staff....
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // payment =payment confirmation
            db
            .collection('users')
            .doc(user?.id)
            .collection('order')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            setSuccessed(true);
            setError(null)
            setProcessing(false)
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate.replace('/orders')
        })



    }
    const handleChange = (event) => {
        // Listen for changes in the cardElement
        // and display any error as the colum types their card details 
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div>
            <Header />
            <div className="payment">
                <div className="payment_container">
                    <h1>Checkout (<Link to="/checkout">{basket?.length} Item</Link>)</h1>
                    {/* payment section */}
                    <div className="payment_section">
                        <div className="payment_title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment_address">
                            <p>{user?.email}</p>
                            <p>123 React lanel</p>
                            <p>Los Angles,CA</p>
                        </div>
                    </div>
                    {/* payment item */}
                    <div className="payment_section">
                        <div className="payment_title">
                            <h3>Review Item and delivery</h3>
                        </div>
                        <div className="payment_item">
                            {/* products show */}
                            {basket.map(item => (< CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                            ))}
                        </div>
                    </div>
                    {/* payment section */}
                    <div className="payment_section">
                        <div className="payment_title">
                            <h3>payment Method</h3>
                        </div>
                        <div className="payment_details">
                            {/* strips magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />

                                <div className="payment_priceContainer">
                                    <CurrencyFormat renderText={(value) => (
                                        <>
                                            <p>
                                                Subtotal({basket.length} item):
                                                <strong>{`${value}`}</strong>
                                            </p>
                                            {/* <small className='subtotal_gift'>
                                                <input type="checkbox" /> This order contains a gift

                                            </small> */}
                                        </>
                                    )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    /> 
                                    <button>Buy Now {processing || disabled || successed}</button>
                                    <span>{processing ? <p>Processing</p> : ""}</span>
                                </div>
                                {/* erorr */}
                                {error && < div>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment