import { useEffect } from "react";
import { useState } from "react";
// import { popularProducts } from "../data";
import styled from "styled-components";
import axios from "axios";
import Product from "./Product";

const URL = "http://localhost:8800/api";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const Products = ({ sort, cat, filters }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	console.log(filteredProducts);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					cat ? `${URL}/products?category=${cat} ` : `${URL}/products`
				);
				setProducts(res.data);
			} catch (err) {}
		};

		getProducts();
	}, [cat]);

	useEffect(() => {
		cat &&
			setFilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(([key, value]) =>
						item[key].includes(value)
					)
				)
			);
	}, [products, cat, filters]);

	useEffect(() => {
		if (sort === "newest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.createdAt - b.createdAt)
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => a.price - b.price)
			);
		} else {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => b.price - a.price)
			);
		}
	}, [sort]);

	return (
		<Container>
			{cat
				? filteredProducts.map((item) => <Product item={item} key={item.id} />)
				: products
						.slice(0, 8)
						.map((item) => <Product item={item} key={item.id} />)}
			{/* {products.map((item) => (
				<Product item={item} key={item.id} />
			))} */}
		</Container>
	);
};

export default Products;
