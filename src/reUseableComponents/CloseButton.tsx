import React from "react";
import { MdOutlineCancel } from "react-icons/md";
const CloseButton = ({ Close }:any) => {
	return (
		<div>
			<button
				type="button"
				onClick={Close}
				className="text-3xl p-3 w-full hover:drop-shadow-xl text-gray-400 rounded-full">
				<MdOutlineCancel />
			</button>
		</div>
	);
};

export default CloseButton;
