import React, { useEffect, useState, useRef } from "react";
import WindowResize from "./WindowResize";

function UseFetchHook() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const contentRef = useRef();
  const mainContentRef = useRef();
  const buttonRef = useRef();

  function handleContentDisplay() {
    contentRef.current.style.display = "block";
    mainContentRef.current.style.display = "block";
    buttonRef.current.style.display = "none";
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      if (data && data.products && data.products.length) {
        setProducts(data.products);
      }

      console.log(data);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();

    function handleWindowClick(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        mainContentRef.current &&
        !mainContentRef.current.contains(event.target)
      ) {
        contentRef.current.style.display = "none";
        mainContentRef.current.style.display = "none";
        buttonRef.current.style.display = "block";
      }
    }

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  if (loading) {
    return <div>Loading... Please wait !</div>;
  }

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div className="main-container">
      <h1>Use Fetch Hook</h1>
      {products && products.length > 0
        ? products.map((product, id) => (
            <div className="mt-3" key={id}>
              {product.title}
            </div>
          ))
        : null}
      <div className="mt-3 text-center">
        <button onClick={handleContentDisplay} ref={buttonRef}>
          Show Content
        </button>
        <h2 ref={contentRef} className="mt-3 main-content">
          This is a random content
        </h2>
        <p ref={mainContentRef} className="content">
          Please click outside of this to close this. It won't close if you
          click inside of this content
        </p>
      </div>
      <WindowResize />
    </div>
  );
}

export default UseFetchHook;
