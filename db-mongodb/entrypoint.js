conn = new Mongo();
db = conn.getDB("justemanger");

db.createUser(
    {
        user: "admin",
        pwd: "pass",
        roles: [
            {
                role: "readWrite",
                db: "justemanger"
            }
        ]
    }
);
