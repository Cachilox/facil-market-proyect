import { useEffect, useState } from "react";
import { getPurchasesByUser } from "../services/purchaseServices";
import { Purchase } from "../utils/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { BsExclamationTriangle } from "react-icons/bs";

const ShoppingHistory = () => {
	const user = useSelector((state: RootState) => state.user.userLogin);
	const [purchases, setPurchases] = useState<Purchase[]>();
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				const response = await getPurchasesByUser(Number(user.user.id));
				setPurchases(response);
			} catch (error: any) {
				setError(error);
			}
		};
		fetchPurchases();
	}, [user]);

	return (
		<>
			<h1 className="shopping-title">Historial de compras</h1>
			{purchases?.length ? (
				purchases.map((purchase) => (
					<Link to={`/product/detail/${purchase.productId}`}>
						<div key={purchase.id} className="shopping-container">
							<img
								src={purchase.product.images[0]}
								alt={purchase.product.name}
							/>
							<h3>{purchase.product.name}</h3>
							<span>{purchase.product.categoryName}</span>
						</div>
					</Link>
				))
			) : (
				<div className="no-purchases">
					<p>No haz realizado ninguna compra todavía</p>
					<BsExclamationTriangle className="warning" />
					<Link to={"/products"}>
						<button>¡Comprar Ahora!</button>
					</Link>
				</div>
			)}
			<p>{error}</p>
		</>
	);
};

export default ShoppingHistory;