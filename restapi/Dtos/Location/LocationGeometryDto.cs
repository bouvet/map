using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace restapi.Dtos.Location
{
  public class LocationGeometryDto
  {
    // Longitude, Latitude
    public double[] Coordinates { get; set; } = Array.Empty<double>();
    public string Type { get; set; } = "Point";
  }
}