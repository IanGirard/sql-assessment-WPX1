select COUNT (model)
from vehicles
where owner_id = $1;