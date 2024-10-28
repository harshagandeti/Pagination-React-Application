import React from "react";
import { useEffect, useState } from "react";
import "../Styles/Product.scss";

const Product = () => {
  const [data, setData] = useState([]);
  const [page, SetPage] = useState(1);
  const HandlePrevClick = () => {
    if (page === 1) {
      alert("You are on the first page");
    } else {
      page += 1;
    }
  };
  const HandleNextClick = () => {
    if (page === 1) {
      alert("You are on the first page");
    } else {
      page += 1;
    }
  };
  const HandleSelectedPage = (i) => {
    SetPage(i + 1);
    console.log(page);
  };
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=190")
      .then((res) => res.json())
      .then((value) => setData(value.products))
      .catch((error) => console.error("Fetch error:", error));
  }, []);
  console.log(data);
  return (
    <div className="App">
      <div className="App__Container">
        {data &&
          data.slice(page * 10, page * 10 + 10).map((item, index) => {
            return (
              <div className="App__Container--Card" key={item.id}>
                <div className="App__Container--Card--top">
                  <img src={item?.images[0]} alt={item.title}></img>
                </div>
                <div className="App__Container--Card--Bottom">
                  <h3>{item.title}</h3>
                  <p>$ {item.price}</p>
                </div>
              </div>
            );
          })}
      </div>
      {
        <div className="App--Pagination">
          <span onClick={HandlePrevClick} className="--Prev">
            ◀️
          </span>
          {[...Array(data.length / 10)].map((t, index) => {
            console.log(t);
            return (
              <span
                key={index}
                onClick={() => HandleSelectedPage(index)}
                className="--Page"
              >
                {index + 1}
              </span>
            );
          })}
          <span onClick={HandleNextClick} className="--Next">
            ▶️
          </span>
        </div>
      }
    </div>
  );
};

export default Product;
