import Sequelize from "sequelize";

/**** ORM ****/
export const Role = global.db.define('roles', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    }
},{
    timestamps: false
});