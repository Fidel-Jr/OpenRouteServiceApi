import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png"
});

// Handles map clicks and reverse geocodes
function LocationMarker({ setCustomer, setAddress }) {
  useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      try {
        const response = await fetch(
          `https://localhost:7099/api/orders/reverse-geocode?lat=${lat}&lng=${lng}`
        );
        const data = await response.json();
        setAddress(data.address);
        setCustomer({ customerLat: lat, customerLng: lng });
      } catch (error) {
        console.error("Reverse geocode failed", error);
        setCustomer({ customerLat: lat, customerLng: lng });
      }
    }
  });
  return null;
}

function MapComponent({ warehouse, customer, setCustomer, setAddress }) {
  return (
    <MapContainer
      center={[warehouse.lat, warehouse.lng]}
      zoom={13}
      style={{ width: "80vw", height: "600px" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[warehouse.lat, warehouse.lng]} />
      {customer && (
        <>
          <Marker position={[customer.customerLat, customer.customerLng]} />
          <Polyline
            positions={[
              [warehouse.lat, warehouse.lng],
              [customer.customerLat, customer.customerLng]
            ]}
            color="blue"
          />
        </>
      )}
      <LocationMarker setCustomer={setCustomer} setAddress={setAddress} />
    </MapContainer>
  );
}

export default MapComponent;