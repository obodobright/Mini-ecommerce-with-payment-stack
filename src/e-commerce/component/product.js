import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Loaders } from "../routes/loader";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://fakestoreapi.com/products";

  const getMyData = async () => {
    setLoading(true);
    await axios.get(url).then((user) => {
      console.log(user.data);
      setData(user.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    getMyData();
  }, []);
  if (loading) {
    return (
      <div style={loaderStyle}>
        <Loaders />
      </div>
    );
  }
  return (
    <Container>
      <Wrapper>
        {data?.map((prop) => {
          const { title, id, price, category, image } = prop;
          return (
            <Card to={`/productdetail/${id}`}>
              <Image src={image} />

              <Title>{title}</Title>
              <ProductContent>
                <Category>{category}</Category>
                <Price> {price}</Price>
              </ProductContent>
            </Card>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default Product;
const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const Image = styled.img`
  width: 100%;
  height: 65%;

  object-fit: contain;
  overflow: hidden;
`;
const Title = styled.div`
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
`;
const Category = styled.div``;
const Price = styled.div``;
const ProductContent = styled.div`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
`;

const Card = styled(Link)`
  width: 400px;
  height: 400px;
  background: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
  text-decoration: none;
  color: black;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: whitesmoke;
`;
