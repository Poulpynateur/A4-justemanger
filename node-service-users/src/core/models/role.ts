import Sequelize from "sequelize";

export const RoleEnum = {
    ADMIN: "admin",
    ENDUSER: {
        name: "enduser",
        CONSUMER: "enduser.consumer",
        RESTORER: "enduser.restorer",
        DELIVERY: "enduser.delivery"
    },
    MANAGEMENT: {
        name: "management",
        COMMERCIAL: "management.commercial",
        TECHNICAL: "management.technical"
    },
    DEVELOPPER: "developper"
}

/**** ORM ****/
export const Role = global.db_msql.define('roles', {
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