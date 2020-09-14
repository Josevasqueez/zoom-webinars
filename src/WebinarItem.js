import React from 'react';
import moment from 'moment';
import 'moment/locale/es';


export const WebinarItem = ({ topic, agenda, start_time, id }) => {

    // Seteamos el idioma español al MomentJS
    moment.locale('es');
    const day = moment(start_time).format("dddd");
    const hour = moment(start_time).format("HH:mm");

    return (
        <div className="col-md-6 col-lg-4 mb-3 animate__animated animate__fadeIn">
            <div className="box-content p-3">
                <h3 className="text-uppercase font-weight-bold mt-2">{topic}</h3>
                <p className="text-justify">{agenda}</p>
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <img src="https://www.cajalosandes.cl/icono-obras-01.png" alt="Fecha"></img>
                        <span>{day}</span>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <img src="https://www.cajalosandes.cl/icono-obras-02.png" alt="Hora"></img>
                        <span>{hour}</span>
                    </div>
                </div>
            </div>
            <div className="box-footer p-2 text-center">
                <p>Transmisión a través de <b className="text-primary">zoom</b></p>
                <a href={`https://zoom.us/webinar/register/${id}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary text-uppercase">Inscríbete aquí</a>
            </div>
        </div>
    )
}
