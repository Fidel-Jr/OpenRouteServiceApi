# 🗺️ Simple Delivery Map Integration Demo

A simple learning project demonstrating how to integrate:

- 🧠 ASP.NET Core Web API  
- ⚛️ React.js  
- 🗺️ Leaflet (OpenStreetMap)  
- 🌍 OpenRouteService API  

This project calculates **distance (km)** and **estimated travel time (ETA)** between a warehouse and a selected customer location.

---

## 🚀 Features

- Create order with:
  - Customer Name
  - Customer Address
- Click on map to select customer location
- Reverse geocoding (map click → auto-fill address)
- Distance & ETA calculation
- Polyline route display on map
- Data stored in database

---

## 🏗️ Tech Stack

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- OpenRouteService API

### Frontend
- React.js
- Leaflet
- OpenStreetMap Tiles

---

## 📍 How It Works

1. Admin types an address OR clicks on the map.
2. If the map is clicked:
   - Coordinates are captured.
   - Reverse geocoding fills the address input automatically.
3. Backend:
   - Uses geocoding (if needed).
   - Calculates route from warehouse → customer.
   - Returns distance (km) and duration (minutes).
4. Map displays markers and route line.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/your-repository-name.git

cd your-repository-name
```

### 2️⃣ Backend Setup
```bash
Update appsettings.json:

"OpenRouteService": {
  "ApiKey": "YOUR_API_KEY"
},
"Warehouse": {
  "Latitude": 14.6091,
  "Longitude": 121.0223
}

```

### 2️⃣ Frontend Setup
```bash

cd client
npm install
npm start

```
