Select time, shape, duration_seconds, duration_hours_min, date_posted, latitude, longitude
from ufo_scrubbed
WHERE date_posted>= '1910-01-01 12:00:00' AND
      date_posted < '2013-09-09 12:00:00';
	
