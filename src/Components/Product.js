import React from "react";
import { useEffect, useState } from "react";
import "../Styles/Product.scss";

const Product = () => {
  const [data, setData] = useState([]);
  const [page, SetPage] = useState(1);
  const FetchData = async () => {
    const fetchData = await fetch("https://dummyjson.com/products?limit=190");
    const value = await fetchData.json();
    setData(value.products);
  };
  const SelectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= data.length / 10 &&
      selectedPage !== page
    )
      SetPage(selectedPage);
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div className="App">
      <div className="App__Container">
        {data &&
          data.slice(page * 10 - 10, page * 10).map((item, index) => {
            return (
              <div className="App__Container--Card" key={item.id}>
                <div className="App__Container--Card--top">
                  {/* <p> {item.id}</p> */}
                  <div className="StockStatus__Brand">
                    <p>
                      <span> Brand</span>
                      {item?.brand}
                    </p>
                    <span></span>
                  </div>
                  <img src={item?.images[0]} alt={item.title}></img>
                </div>
                <div className="App__Container--Card--Bottom">
                  <h2>{item?.title}</h2>
                  <div className="price">
                    <p>Price :${item?.price}</p>
                    <span>Discount : {item?.discountPercentage}%</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {
        <div className="App--Pagination">
          <span onClick={() => SelectPageHandler(page - 1)} className="--Prev">
            ◀️
          </span>
          {[...Array(data.length / 10)].map((t, index) => {
            console.log(t);
            return (
              <span
                key={index}
                onClick={() => SelectPageHandler(index + 1)}
                className="--Page"
              >
                {index + 1}
              </span>
            );
          })}
          <span onClick={() => SelectPageHandler(page + 1)} className="--Next">
            ▶️
          </span>
        </div>
      }
    </div>
  );
};

export default Product;
