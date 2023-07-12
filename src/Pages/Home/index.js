import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Card, CardMedia, CardContent, Typography, Rating, Button, Grid, Skeleton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import check from './img/check.png';
import minus from './img/minus.png';
import nike from './img/nike.png';
import plus from './img/plus.png';
import trash from './img/trash.png';

import { Theme, Title } from '~/components/GlobalStyles/theme.js';

function Home() {
    let products = [
        {
            id: 1,
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-mens-running-shoe-wide-D24Mcz-removebg-preview.png',
            name: 'Nike Air Zoom Pegasus 36',
            description:
                'The iconic Nike Air Zoom Pegasus 36 offers more cooling and mesh that targets breathability across high-heat areas. A slimmer heel collar and tongue reduce bulk, while exposed cables give you a snug fit at higher speeds.',
            price: 108.97,
            color: '#e1e7ed',
        },
        {
            id: 2,
            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/air-zoom-pegasus-36-shield-mens-running-shoe-24FBGb__1_-removebg-preview.png',
            name: 'Nike Air Zoom Pegasus 36 Shield',
            description:
                'The Nike Air Zoom Pegasus 36 Shield gets updated to conquer wet routes. A water-repellent upper combines with an outsole that helps create grip on wet surfaces, letting you run in confidence despite the weather.',
            price: 89.97,
            color: '#4D317F',
        },
    ];
    let [productsinCart, setCartItems] = useState([]);
    let [statebutton, setStatebutton] = useState([]);
    let [price, setprice] = useState(0);
    const addToCart = (index) => {
        const temp = { ...products[index], quantity: 1 };
        productsinCart = [...productsinCart, temp];
        setCartItems(productsinCart);
        console.log(productsinCart);
        statebutton[index] = true;
        setStatebutton(statebutton);
        price = price + products[index].price;
        setprice(price);
        Save();
    };
    const removeToCart = (index) => {
        statebutton[productsinCart[index].id - 1] = false;
        setStatebutton(statebutton);
        price = price - productsinCart[index].price * productsinCart[index].quantity;
        setprice(price);
        productsinCart.splice(index, 1);
        setCartItems(productsinCart);
        Save();
    };
    const plusQuantity = (index) => {
        price = price + productsinCart[index].price;
        setprice(price);
        productsinCart[index].quantity++;
        setCartItems(productsinCart);
        Save();
    };
    const minusQuantity = (index) => {
        if (productsinCart[index].quantity == 1) {
            removeToCart(index);
        } else {
            price = price - productsinCart[index].price;
            setprice(price);
            productsinCart[index].quantity--;
            setCartItems(productsinCart);
            Save();
        }
    };
    const Save = () => {
        let sessions = {};
        sessions.productsinCart = productsinCart;
        sessions.price = price;
        sessions.statebutton = statebutton;
        sessionStorage.setItem('cartItems', JSON.stringify(sessions));
    };
    // const [products, setProducts] = useState([]);
    useEffect(() => {
        const sessions = JSON.parse(sessionStorage.getItem('cartItems'));
        if (sessions) {
            setprice(sessions.price);
            setCartItems(sessions.productsinCart);
            setStatebutton(sessions.statebutton);
        }
        //     async function fetchData() {
        //         try {
        //             await axios({
        //                 method: 'GET',
        //                 url: 'http://localhost:8080/product',
        //             }).then((res) => {
        //                 setProducts(res.data);
        //                 console.log(res.data);
        //             });
        //         } catch (error) {
        //             console.error(error);
        //         }
        //     }
        //     fetchData();
    }, []);

    //Card our product
    function OurProduct() {
        return (
            <Grid
                alignItems="center"
                container
                direction="column"
                style={{
                    padding: '32px',
                    width: '360px',
                    borderRadius: '30px',
                    boxShadow:
                        ' 0 3.2px 2.2px rgba(0,0,0,.02), 0 7px 5.4px rgba(0,0,0,.028), 0 12.1px 10.1px rgba(0,0,0,.035), 0 19.8px 18.1px rgba(0,0,0,.042), 0 34.7px 33.8px rgba(0,0,0,.05), 0 81px 81px rgba(0,0,0,.07)',
                }}
            >
                <Grid container direction="column" style={{ paddingLeft: '8px' }}>
                    <img
                        src={nike}
                        style={{ objectFit: 'contain', height: '26px', width: '50px', color: Theme.colors.black }}
                    ></img>
                    <Typography style={Title}>Our Products</Typography>
                </Grid>
                {/* list products */}
                <Grid
                    style={{
                        height: '550px',
                        overflow: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    {products?.map((product, index) => {
                        return (
                            <>
                                <Grid container direction="column" key={product.id}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        style={{
                                            background: product.color,
                                            width: '100%',
                                            height: '380px',
                                            borderRadius: '30px',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            style={{
                                                objectFit: 'contain',
                                                height: '304px',
                                                width: '100%',
                                                transform: 'rotate(-24deg)',
                                                marginLeft: '-12px',
                                            }}
                                        ></img>
                                    </Grid>
                                    <Grid style={{ paddingBottom: '8px' }}>
                                        <Typography
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: '550',
                                                paddingBottom: '8px',
                                                color: Theme.colors.black,
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography
                                            style={{ fontWeight: '200', fontSize: '14px', color: Theme.colors.black }}
                                        >
                                            {product.description}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        style={{ paddingBottom: '32px' }}
                                    >
                                        <Grid container style={{ width: 'auto' }} alignItems="top">
                                            <AttachMoneyIcon
                                                style={{
                                                    fontSize: '26px',
                                                    marginRight: '-4px',
                                                    color: Theme.colors.black,
                                                }}
                                            ></AttachMoneyIcon>
                                            <Typography
                                                style={{
                                                    fontWeight: '550',
                                                    fontSize: '20px',
                                                    color: Theme.colors.black,
                                                }}
                                            >
                                                {product.price}
                                            </Typography>
                                        </Grid>
                                        {statebutton[index] == true ? (
                                            <Grid
                                                container
                                                justifyContent="center"
                                                alignItems="center"
                                                style={{
                                                    background: Theme.colors.yellow,
                                                    borderRadius: '50%',
                                                    width: '40px',
                                                    height: '40px',
                                                    position: 'relative',
                                                }}
                                            >
                                                <img src={check} style={{ height: '30px', width: '30px' }}></img>
                                            </Grid>
                                        ) : (
                                            <Button
                                                onClick={() => addToCart(index)}
                                                style={{
                                                    fontWeight: '700',
                                                    fontSize: '14px',
                                                    padding: '8px',
                                                    color: Theme.colors.black,
                                                    background: Theme.colors.yellow,
                                                    borderRadius: '45px',
                                                }}
                                            >
                                                ADD TO CART
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>
                            </>
                        );
                    })}
                </Grid>
            </Grid>
        );
    }
    //Card your cart
    function YourCart() {
        return (
            <Grid
                alignItems="center"
                container
                direction="column"
                style={{
                    padding: '32px',
                    marginLeft: '32px',
                    width: '360px',
                    borderRadius: '30px',
                    boxShadow:
                        ' 0 3.2px 2.2px rgba(0,0,0,.02), 0 7px 5.4px rgba(0,0,0,.028), 0 12.1px 10.1px rgba(0,0,0,.035), 0 19.8px 18.1px rgba(0,0,0,.042), 0 34.7px 33.8px rgba(0,0,0,.05), 0 81px 81px rgba(0,0,0,.07)',
                }}
            >
                <Grid container>
                    <Grid container direction="column" style={{ paddingLeft: '8px' }}>
                        <img src={nike} style={{ objectFit: 'contain', height: '26px', width: '50px' }}></img>

                        <Grid container justifyContent="space-between">
                            <Grid container style={{ width: 'auto' }}>
                                <Typography style={Title}>Your cart</Typography>
                            </Grid>
                            <Grid container style={{ width: 'auto' }} alignItems="top">
                                <AttachMoneyIcon
                                    style={{ fontSize: '32px', marginRight: '-4px', color: Theme.colors.black }}
                                ></AttachMoneyIcon>

                                <Typography style={Title}>
                                    {productsinCart.length == 0 ? 0 : price.toFixed(2)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid style={{ height: '550px', overflow: 'auto', overflowX: 'hidden', scrollbarColor: 'transparent' }}>
                    {productsinCart.length == 0 ? (
                        <Grid container>
                            <Typography style={{ fontWeight: '200', width: 'auto' }}>Your cart is empty.</Typography>
                        </Grid>
                    ) : (
                        productsinCart?.map((product, index) => {
                            return (
                                <>
                                    <Grid container spacing={2} style={{ paddingBottom: '16px' }}>
                                        <Grid item container xs={5}>
                                            <Grid container alignItems="center" justifyContent="center">
                                                <Grid
                                                    style={{
                                                        background: product.color,
                                                        borderRadius: '50%',
                                                        width: '100px',
                                                        height: '100px',
                                                        position: 'relative',
                                                    }}
                                                ></Grid>
                                                <img
                                                    src={product.image}
                                                    style={{
                                                        position: 'absolute',
                                                        marginBottom: '50px',
                                                        objectFit: 'contain',
                                                        width: '150px',
                                                        height: '150px',
                                                        transform: 'rotate(-24deg)',
                                                        marginLeft: '-12px',
                                                    }}
                                                ></img>
                                            </Grid>
                                        </Grid>
                                        <Grid item container direction="column" xs={7} spacing={1}>
                                            <Grid item>
                                                <Typography
                                                    style={{
                                                        fontSize: '15px',
                                                        fontWeight: '600',
                                                        color: Theme.colors.black,
                                                    }}
                                                >
                                                    {product.name}
                                                </Typography>
                                            </Grid>
                                            <Grid container item>
                                                <AttachMoneyIcon
                                                    style={{
                                                        fontSize: '26px',
                                                        marginRight: '-4px',
                                                        color: Theme.colors.black,
                                                    }}
                                                ></AttachMoneyIcon>
                                                <Typography
                                                    style={{
                                                        fontWeight: '700',
                                                        fontSize: '20px',
                                                        color: Theme.colors.black,
                                                    }}
                                                >
                                                    {product.price}
                                                </Typography>
                                            </Grid>
                                            <Grid container item>
                                                <Grid container xs={8} alignItems="center">
                                                    <button
                                                        onClick={() => minusQuantity(index)}
                                                        style={{
                                                            background: Theme.colors.button,
                                                            border: '0px',
                                                            borderRadius: '45px',
                                                            height: '30px',
                                                            width: '30px',
                                                            marginRight: '10px',
                                                        }}
                                                    >
                                                        <Grid container justifyContent="center" alignItems="center">
                                                            <img
                                                                style={{
                                                                    height: '10px',
                                                                    width: '10px',
                                                                    color: Theme.colors.black,
                                                                }}
                                                                src={minus}
                                                            ></img>
                                                        </Grid>
                                                    </button>
                                                    <Typography>{product.quantity}</Typography>
                                                    <button
                                                        onClick={() => plusQuantity(index)}
                                                        style={{
                                                            background: Theme.colors.button,
                                                            border: '0px',
                                                            borderRadius: '45px',
                                                            height: '30px',
                                                            width: '30px',
                                                            marginLeft: '10px',
                                                        }}
                                                    >
                                                        <Grid container justifyContent="center" alignItems="center">
                                                            <img
                                                                style={{
                                                                    height: '10px',
                                                                    width: '10px',
                                                                    color: Theme.colors.black,
                                                                }}
                                                                src={plus}
                                                            ></img>
                                                        </Grid>
                                                    </button>
                                                </Grid>
                                                <Grid container xs={4}>
                                                    <Grid container>
                                                        <Grid>
                                                            <button
                                                                onClick={() => removeToCart(index)}
                                                                style={{
                                                                    background: Theme.colors.yellow,
                                                                    border: '0px',
                                                                    borderRadius: '45px',
                                                                    height: '30px',
                                                                    width: '30px',
                                                                }}
                                                            >
                                                                <Grid
                                                                    container
                                                                    justifyContent="center"
                                                                    alignItems="center"
                                                                >
                                                                    <img
                                                                        style={{ height: '16px', width: '16px' }}
                                                                        src={trash}
                                                                    ></img>
                                                                </Grid>
                                                            </button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            );
                        })
                    )}
                </Grid>
            </Grid>
        );
    }
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <OurProduct></OurProduct>
                <YourCart></YourCart>
            </Grid>
        </>
    );
}
export default Home;
