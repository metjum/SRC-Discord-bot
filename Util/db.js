import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Data/db.sqlite',
    logging: false
})

export const DB = sequelize.define('Games', {
    channel: {
        type: DataTypes.STRING,
    },
    gameid: {
        type: DataTypes.STRING,
    }
})