import React, { useEffect } from 'react';

function App() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGjD7oDAHKxgftcvbLlmXoT6uSMVoVwt8&callback=initMap";
        script.async = true;
        document.body.appendChild(script);

        window.initMap = () => {
            var map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: { lat: 40.7128, lng: -74.0060 }
            });

            fetch('/api/coordenadas')
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        map.setCenter({
                            lat: data[0].location.coordinates[1],
                            lng: data[0].location.coordinates[0]
                        });

                        data.forEach(point => {
                            new window.google.maps.Marker({
                                position: {
                                    lat: point.location.coordinates[1],
                                    lng: point.location.coordinates[0]
                                },
                                map: map,
                                title: 'Marcador Dinámico'
                            });
                        });
                    } else {
                        console.log("No se encontraron puntos.");
                    }
                })
                .catch(error => console.error('Error al cargar datos:', error));
        };
    }, []);

    return (
        <div>
            <h1>Mapa con Marcadores Dinámicos</h1>
            <div id="map" style={{ height: '500px', width: '100%', border: '2px solid #ddd' }}></div>
        </div>
    );
}

export default App;
