namespace DeliveryAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }

        public double CustomerLat { get; set; }
        public double CustomerLng { get; set; }

        public double DistanceKm { get; set; }
        public double DurationMinutes { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
