import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import axios from "axios";
import { Loaders } from "../routes/loader";
import { usePaystackPayment } from "react-paystack";
import { useHistory } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const goBack = () => {
    history.push("/");
  };
  const getData = async () => {
    setLoading(true);
    await axios.get("https://fakestoreapi.com/products").then((detail) => {
      console.log(detail.data);
      setData(detail.data[id - 1]);
    });
    setLoading(false);
  };
  const config = {
    reference: new Date().getTime().toString(),
    email: "yourname@gmail.com",
    amount: data.price * 100,
    publicKey: "pk_test_6ba83ffbe298d4f20c6ca87a9e7254fb6e14ebc2",
  };
  const onSuccess = (reference) => {
    console.log(reference);
  };
  const onClose = () => {
    console.log("closed");
  };
  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    getData();
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
      <Button onClick={goBack}>Back</Button>
      <Wrapper>
        {data && (
          <Card>
            <Image src={data.image} />
            <DetailContent>
              <Title>{data.title}</Title>
              <Description>{data.description}</Description>
              <Info>
                <Category>{data.category.toUpperCase()} </Category>
                <Rating>Rating: {data.rating.rate}</Rating>
              </Info>
              <Price
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
              >
                ${data.price}
              </Price>
            </DetailContent>
          </Card>
        )}
      </Wrapper>
    </Container>
  );
};

export default ProductDetail;
const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
const Button = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin: 20px;
  font-weight: bold;
  transition: all 350ms;
  cursor: pointer;
`;
const Info = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    // margin: 0 20px;
  }
`;
const Image = styled.img`
  width: 500px;
  height: 500px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 70%;
  }
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding: 20px 0;
  width: 600px;

  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
  }
`;
const Description = styled.div`
  font-size: 20px;
  font-weight: 500;
  width: 600px;
  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
`;
const Price = styled.div`
  width: 300px;
  height: 40px;
  border: 1px solid black;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 30px auto;
  margin-top: 100px;
  transition: all 350ms;

  :hover {
    cursor: pointer;
    border: 1px solid lightgray;
  }
`;

const Category = styled.div``;
const Rating = styled.div``;
const DetailContent = styled.div`
  @media (max-width: 768px) {
    width: 80%;
  }
`;
const Card = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: center;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
