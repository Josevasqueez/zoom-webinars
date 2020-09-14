import React, { useState } from 'react';
import Select from 'react-select';
import { useFetch } from './hooks/useFetch';
import { WebinarItem } from './WebinarItem';
import moment from 'moment';

function ZoomApp() {

	// Aquí configurar la URL de la api que utilizaremos como puente entre ZOOM y esta vista.
	const url = 'http://localhost:3700/webinars'
	
	// Acá realizamos la petición
	const { data, loading } = useFetch(url);

	// Aqui defino el estado de la página y el topic seleccionado
	const [topic, setTopic] = useState('');
	const [page, setPage] = useState(0);

	// Funcion para cuando cambio de valor en el select.
	const handleChange = ({ value }) => {
		setTopic(value);
		setPage(0);
	}

	// Aplicamos los filtros para limpiar el resultado
	if (!loading) {
		var { webinars } = data;

		// Obtener topics
		var topics = webinars.map(web => web.topic);
		topics = topics.filter((el, index) => topics.indexOf(el) === index);

		// Llenar opciones para el select
		var options = topics.map(element => {
			return { value: element, label: element }
		});
		options.push({ value: '', label: 'Todos' });
		options = options.reverse();

		// filtramos los webinars por los que pueden ser mostrados
		webinars = webinars.filter(web => {
			if (web.type === 9 || web.type === 6) return true;
			if (web.type === 5) {
				if (moment().isSameOrAfter(web.start_time)) return true;
			}
			return false;
		});

		// Ahora filtro si incluye el topic seleccionado
		webinars = webinars.filter(web => {
			if (web.topic.includes(topic)) return true;
			return false;
		})

		// Detectamos la cantidad de páginas necesarias
		var pages = Math.ceil((webinars.length) / 6);
		var resultWebinars = [];
		for (let i = 0; i < pages; i++) {
			resultWebinars = resultWebinars.concat([webinars.slice(i * 6, (i * 6) + 6)])
		}
	}

	return (
		<div className="container-fluid">
			{
				loading && <div className="text-center py-5 my-5"><div className="spinner-border text-primary" role="status"></div></div>
			}
			{
				!loading &&
				<>
					<div className="row my-4 justify-content-center">
						<div className="col-md-4">

							<Select
								defaultValue={options[0]}
								options={options}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="row">
						{
							!loading &&
							resultWebinars[page].map(web => {
								return <WebinarItem key={web.id} {...web} />
							})
						}
					</div>
					<ul className="pagination justify-content-center mt-4">
						<li className={`page-item ${page <= 0 && 'disabled'}`}>
							<button className="btn page-link" onClick={() => setPage(page - 1)}>
								<span aria-hidden="true">&laquo; Volver</span>
							</button>
						</li>
						<li className={`page-item ${page >= pages-1 && 'disabled'}`}>
							<button className="btn page-link" onClick={() => setPage(page + 1)}>
								<span aria-hidden="true">Siguiente &raquo;</span>
							</button>
						</li>
					</ul>
				</>
			}
		</div>
	);
}

export default ZoomApp;
