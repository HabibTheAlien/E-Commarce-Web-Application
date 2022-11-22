import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
const Container = styled.div`
	background-color: #dddddd;
	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 60px);
	width: 100vw;
`;

const Error = () => {
	return (<>
    <Navbar/>
		<Container>
			<h1>404 Page Not Found!!!!....</h1>
		</Container>
    </>
	);
};

export default Error;
