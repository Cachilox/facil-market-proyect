import { getDetail, cleanDetail } from "../redux/features/productSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getProductsById } from "../services/productServices";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useProduct = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const product = useSelector((state: RootState) => state.product.detail);

	useEffect(() => {
		try {
			fetch(`http://localhost:3001/product/${id}`)
				.then((response) => response.json())
				.then((data) => dispatch(getDetail(data)));
		} catch (error) {
			console.log(error);
		}
		return () => {
			dispatch(
				cleanDetail({
					id: 0,
					name: "",
					description: "",
					stock: 0,
					rating: 0.0,
					image: "",
					location: "",
					price: 0.0,
					categoryID: 0,
					categoryName: "",
					userID: 0,
					userName: "",
				})
			);
		};
	}, [dispatch, id]);

	return product;
};

export default useProduct;