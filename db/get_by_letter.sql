select vehicles.* from vehicles
join users
on vehicles.owner_id = users.id
where users.name like $1
;