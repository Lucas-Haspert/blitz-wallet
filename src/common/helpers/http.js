export const getStatusCodeInfo = (statusCode) => {
    // Set the response.
    var response = {
        statusCode: null,
        statusText: null,
        descriptionENG: null,
        descriptionESP: null,
    }

    // No status code provided.
    if (statusCode === null) {
        response.statusCode = null;
        response.code = null;
        response.descriptionENG = "No status code provided.";
        response.descriptionESP = "No se proveyó un status code.";
        return response;
    }

    /* 200 - 299 **********************************************************************************/
    if (statusCode === "200") {
        response.statusCode = 200;
        response.statusText = "OK";
        response.descriptionENG = "The request has succeeded.";
        response.descriptionESP = "La solicitud ha tenido éxito.";
    }

    if (statusCode === "201") {
        response.statusCode = 201;
        response.statusText = "Created";
        response.descriptionENG = "The request has succeeded and has led to the creation of a resource.";
        response.descriptionESP = "La solicitud se ha realizado correctamente y ha dado lugar a la creación de un recurso.";
    }

    if (statusCode === "202") {
        response.statusCode = 202;
        response.statusText = "Accepted";
        response.descriptionENG = "The request has been accepted for processing.";
        response.descriptionESP = "La solicitud ha sido aceptada para su procesamiento.";
    }

    /* 400 - 499 **********************************************************************************/
    if (statusCode === "400") {
        response.statusCode = 400;
        response.statusText = "Bad Request";
        response.descriptionENG = "The server cannot or will not process the request.";
        response.descriptionESP = "El servidor no puede o no procesará la solicitud.";
    }

    if (statusCode === "401") {
        response.statusCode = 401;
        response.statusText = "Unauthorized";
        response.descriptionENG = "The client request has not been completed because it lacks valid authentication credentials for the requested resource.";
        response.descriptionESP = "La solicitud del cliente no se ha completado porque carece de credenciales de autenticación válidas para el recurso solicitado.";
    }

    if (statusCode === "404") {
        response.statusCode = 404;
        response.statusText = "Not Found";
        response.descriptionENG = "The server cannot find the requested resource.";
        response.descriptionESP = "El servidor no puede encontrar el recurso solicitado.";
    }

    if (statusCode === "408") {
        response.statusCode = 408;
        response.statusText = "Request Timeout";
        response.descriptionENG = "The server would like to shut down this unused connection.";
        response.descriptionESP = "El servidor desea cerrar esta conexión no utilizada.";
    }

    /* 500 - 599 **********************************************************************************/
    if (statusCode === "500") {
        response.statusCode = 500;
        response.statusText = "Internal Server Error";
        response.descriptionENG = "The server encountered an unexpected condition that prevented it from fulfilling the request.";
        response.descriptionESP = "El servidor encontró una condición inesperada que le impidió cumplir con la solicitud.";
    }

    if (statusCode === "501") {
        response.statusCode = 501;
        response.statusText = "Not Implemented";
        response.descriptionENG = "The server does not support the functionality required to fulfill the request.";
        response.descriptionESP = "El servidor no admite la funcionalidad requerida para cumplir con la solicitud.";
    }

    if (statusCode === "502") {
        response.statusCode = 502;
        response.statusText = "Bad Gateway";
        response.descriptionENG = "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.";
        response.descriptionESP = "El servidor, mientras actuaba como puerta de enlace o proxy, recibió una respuesta no válida del servidor ascendente.";
    }

    if (statusCode === "503") {
        response.statusCode = 503;
        response.statusText = "Service Unavailable";
        response.descriptionENG = "The server is not ready to handle the request.";
        response.descriptionESP = "El servidor no está listo para manejar la solicitud.";
    }
    
    if (statusCode === "504") {
        response.statusCode = 504;
        response.statusText = "Gateway Timeout";
        response.descriptionENG = "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server that it needed in order to complete the request.";
        response.descriptionESP = "El servidor, mientras actuaba como puerta de enlace o proxy, no obtuvo una respuesta a tiempo del servidor ascendente que necesitaba para completar la solicitud.";
    }

    // The status code is not contemplated.
    if (statusCode !== null && response.statusCode === null) {
        response.statusCode = null;
        response.code = null;
        response.descriptionENG = "The status code is not contemplated.";
        response.descriptionESP = "El status code no está contemplado.";
        return response;
    }

    return response;
}