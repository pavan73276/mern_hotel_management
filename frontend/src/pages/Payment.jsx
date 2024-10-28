import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51QD8OnHWA1JKhwaCEAYODJvDIOBDGL4VrYEf7UFyvifJZnIgE4wH91xv5XNM9xN84fOjOe2s7lnEFYkNkqHtwj2F007NOUy002');

export default function Payment({roomType}) {

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  

  // const handleSubmit = (e) => {-
  //   e.preventDefault();
  //   dispatch(login(formData));
  // };

  // Handle Side Effects
  useEffect(() => {
    if (error) {
      toast.error(error); // Display Error Message
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      toast.success("Please Login First");
      navigateTo("/login"); // Redirect to Home on Successful Login
    }
  }, [dispatch, error, loading, isAuthenticated, navigateTo]);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm roomType={roomType} />
      </Elements>
   
    </div>
  );
}
