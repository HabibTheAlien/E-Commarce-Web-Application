import { Add, Remove } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";

import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
const KEY =
	"pk_test_51LKjSjSA0CcEqQB9LRDTcG9hReIOLIiFXEr4FVeFltodg28EcryHkMk4SiNhv28upB1xAEWJvK0fNMG25JG6wI4s00Th2hb4qp";

const Container = styled.div``;

const Wrapper = styled.div`
	padding: 20px;
	${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
	font-weight: 300;
	text-align: center;
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;

const TopButton = styled.button`
	padding: 10px;
	font-weight: 600;
	cursor: pointer;
	border-radius: 5px;
	border: ${(props) => props.type === "filled" && "none"};
	background-color: ${(props) =>
		props.type === "filled" ? "black" : "transparent"};
	color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
	${mobile({ display: "none" })}
`;
const TopText = styled.span`
	text-decoration: underline;
	cursor: pointer;
	margin: 0px 10px;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
	flex: 3;
`;

const Product = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
	margin-bottom: 5px;
	border-bottom: #e7e7e7 1px solid;
	border-radius: 5px;
`;

const ProductDetail = styled.div`
	flex: 2;
	display: flex;
`;

const Image = styled.img`
	width: 200px;
`;

const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
	${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
	font-size: 30px;
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
	background-color: #d8d6d6;
	border: none;
	height: 1px;
`;

const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 20px;
	height: 50vh;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;

const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	cursor: pointer;
	border-radius: 5px;
	font-weight: 600;
`;

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	const navigate = useNavigate();
	const [stripeToken, setStripeToken] = useState(null);

	const onToken = (token) => {
		setStripeToken(token);
	};

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await userRequest.post("/checkout/payment", {
					tokenId: stripeToken.id,
					amount: cart.total * 100,
				});
				console.log(res.data);
				navigate("/error", { replace: true, data: res.data });
			} catch (err) {
				console.log(err);
			}
		};

		stripeToken && cart.total > 1 && makeRequest();
	}, [stripeToken, navigate, cart.total]);
	return (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<Title>YOUR BAG</Title>
				<Top>
					<Link to="/" className="link">
						<TopButton>CONTINUE SHOPPING</TopButton>
					</Link>
					<TopTexts>
						<TopText>Shopping Bag(2)</TopText>
						<TopText>Your Wishlist (0)</TopText>
					</TopTexts>
					<TopButton type="filled">CHECKOUT NOW</TopButton>
				</Top>
				<Bottom>
					<Info>
						{cart.products.map((product) => (
							<Product>
								<ProductDetail>
									<Image src={product.img} />
									<Details>
										<ProductName>
											<b>Product: </b>
											{product.title}
										</ProductName>
										<ProductId>
											<b>ID: </b> {product._id}
										</ProductId>
										<ProductColor color={product.color} />
										<ProductSize>
											<b>Size: </b>
											{product.size.toUpperCase()}
										</ProductSize>
									</Details>
								</ProductDetail>
								<PriceDetail>
									<ProductAmountContainer>
										<Add style={{ cursor: "pointer" }} />
										<ProductAmount>{product.quantity}</ProductAmount>
										<Remove style={{ cursor: "pointer" }} />
									</ProductAmountContainer>
									<ProductPrice>
										$ {product.price * product.quantity}
									</ProductPrice>
								</PriceDetail>
								<Hr />
							</Product>
						))}
					</Info>
					<Summary>
						<SummaryTitle>ORDER SUMMARY</SummaryTitle>
						<SummaryItem>
							<SummaryItemText>Subtotal</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Estimated Shipping</SummaryItemText>
							<SummaryItemPrice>$ 5.90</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem>
							<SummaryItemText>Shipping Discount</SummaryItemText>
							<SummaryItemPrice>$ -5.90</SummaryItemPrice>
						</SummaryItem>
						<SummaryItem type="total">
							<SummaryItemText>Total</SummaryItemText>
							<SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
						</SummaryItem>
						<StripeCheckout
							name="Habib Shop"
							image="https://lh3.googleusercontent.com/ogw/AOh-ky2fRgZCxr9EXdFs_BH0jejJ3H9T2nIE0rIn9Kup=s32-c-mo"
							billingAddress
							shippingAddress
							description={`Your total is ${cart.total}`}
							amount={cart.total * 100}
							token={onToken}
							stripeKey={KEY}
						>
							<Button>CHECKOUT NOW</Button>
						</StripeCheckout>
					</Summary>
				</Bottom>
			</Wrapper>
			<Footer />
		</Container>
	);
};

export default Cart;
