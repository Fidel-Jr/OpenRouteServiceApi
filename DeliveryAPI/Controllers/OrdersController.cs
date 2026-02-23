using DeliveryAPI.Data;
using DeliveryAPI.Models;
using DeliveryAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DeliveryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly RouteService _routeService;
        private readonly IConfiguration _config;

        public OrdersController(AppDbContext context, RouteService routeService, IConfiguration config)
        {
            _context = context;
            _routeService = routeService;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto dto)
        {
            double lat, lng;

            if (dto?.CustomerLat != null && dto?.CustomerLng != null)
            {
                lat = dto.CustomerLat;
                lng = dto.CustomerLng;
            }
            else
            {
                (lat, lng) = await _routeService.Geocode(dto.CustomerAddress);
            }

            double warehouseLat = double.Parse(_config["Warehouse:Latitude"]!);
            double warehouseLng = double.Parse(_config["Warehouse:Longitude"]!);

            var (distance, duration) = await _routeService.GetRoute(warehouseLat, warehouseLng, lat, lng);

            var order = new Order
            {
                CustomerName = dto.CustomerName,
                CustomerAddress = dto.CustomerAddress,
                CustomerLat = lat,
                CustomerLng = lng,
                DistanceKm = distance,
                DurationMinutes = duration,
                CreatedAt = DateTime.UtcNow
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpGet("reverse-geocode")]
        public async Task<IActionResult> ReverseGeocode(double lat, double lng)
        {
            var address = await _routeService.ReverseGeocode(lat, lng);
            return Ok(new { address });
        }
    }
}
