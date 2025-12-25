import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './App.css';
import PaymentButton from './paymentButton';

const App = () => {

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBuying, setIsBuying] = useState(false);

  const priceLabel = useMemo(() => {
    const amount = product?.price?.amount;
    const currency = product?.price?.currency;
    if (typeof amount !== 'number') return '';

    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency || 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${currency || 'INR'} ${amount}`;
    }
  }, [product]);

    useEffect(()=>{
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    axios.get('http://localhost:3000/products/get-item')
    .then(response=>{
      if (!isMounted) return;
      const nextProduct = response?.data?.product;
      setProduct(Array.isArray(nextProduct) ? nextProduct[0] : nextProduct);
    })
    .catch((err) => {
      if (!isMounted) return;
      setError(err?.response?.data?.message || err.message || 'Failed to load product');
    })
    .finally(() => {
      if (!isMounted) return;
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
    },[])

  const handleBuyNow = async () => {
    if (!product || isBuying) return;

    setIsBuying(true);
    try {
      await new Promise((r) => setTimeout(r, 450));
      alert(`Buy Now: ${product.title} (${priceLabel})`);
    } finally {
      setIsBuying(false);
    }
  };

  return (
  <div className="app">
    {isLoading && (
      <div className="state">
        <div className="stateTitle">Loading product…</div>
        <div className="stateSmall">Fetching from backend.</div>
      </div>
    )}

    {!isLoading && error && (
      <div className="state">
        <div className="stateTitle">Couldn’t load product</div>
        <div className="stateSmall">{error}</div>
      </div>
    )}

    {!isLoading && !error && product && (
      <div className="card">
        <div className="media">
          <img className="image" src={product.image} alt={product.title} />
        </div>

        <div className="content">
          <div className="titleRow">
            <div className="title">{product.title}</div>
            <div className="badge">{product.category}</div>
          </div>

          <div className="desc">{product.description}</div>

          <div className="meta">
            <div>
              <div className="price">{priceLabel}</div>
              <div className="sub">Product ID: {product._id}</div>
            </div>
            <div className="actions">
              <PaymentButton/>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default App