Select index, number, title, classification, latitude, longitude
from bfro_locations
WHERE timestamp >= '1910-01-01 12:00:00' AND
      timestamp < '2013-09-09 12:00:00';