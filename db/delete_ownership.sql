update vehicles set owner_id = null
where id = $1
returning *;