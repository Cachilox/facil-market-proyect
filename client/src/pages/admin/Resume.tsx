import { ChangeEvent, useEffect, useState } from "react";
import { getBasicResume, getDataAnalytics } from "../../services/adminServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
	getAnalyticsData,
	getResumeInfo,
} from "../../redux/features/adminSlice";
import BarChart from "../../graphic/BarChart";
import PieChart from "../../graphic/PieChar";

const Resume = () => {
	const dispatch = useDispatch();
	const dataResume = useSelector((state: RootState) => state.admin.basicData);

	useEffect(() => {
		const fetchDashboardData = async () => {
			const resume = await getBasicResume();
			dispatch(getResumeInfo(resume));
			const data = await getDataAnalytics();
			dispatch(getAnalyticsData(data));
		};
		fetchDashboardData();
	}, [dispatch]);

	const properties = Object.entries(dataResume.ProductsOnAccesories);

	const [graphMode, setGraphMode] = useState({
		pieChart: false,
		barChart: true,
	});

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		if (value === "circular") {
			setGraphMode({ ...graphMode, pieChart: true, barChart: false });
		}

		if (value === "columnas") {
			setGraphMode({ ...graphMode, barChart: true, pieChart: false });
		}
	};

	return (
		<div className="graph-conteiner">
			<section>
				<select onChange={handleChange} defaultValue="default">
					<option disabled value="default">
						Seleccionar una opción
					</option>
					<option value="columnas">Columnas</option>
					<option value="circular">Circular</option>
				</select>
			</section>

			{graphMode.barChart ? <BarChart /> : <PieChart />}

			<section>
				<h3>Resumen general</h3>
				<h4>Productos activos: {dataResume.totalProducts}</h4>
				<h4>Usuarios activos: {dataResume.totalUsers}</h4>
				<h4>Ventas totales: {dataResume.totalSales}</h4>
				<br />
				<hr />

				<h3>Categorias publicadas</h3>
				<div>
					{properties.map((match, index) => {
						return (
							<h4 key={index}>
								{match[0]}: {match[1]}
							</h4>
						);
					})}
				</div>
			</section>
		</div>
	);
};

export default Resume;
