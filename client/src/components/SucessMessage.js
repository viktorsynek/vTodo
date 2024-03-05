import React, { useState, useEffect } from "react";

const SucessMessage = ({ sucessMsg }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (sucessMsg) setIsVisible(true);
	}, [sucessMsg]);

	return (
		<div
			className={`sucess-box`}
			style={{ display: isVisible ? "inline-block" : "none" }}
		>
			<p>{sucessMsg}</p>
		</div>
	);
};

export default SucessMessage;
