"use strict"

import { Model, DataTypes } from "sequelize";
import sequelize from "@/app/db_connection";

class Test extends Model {
    static associate(models) {}
}

Test.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Test",
        tableName: "tests",
        timestamps: false
    }
);

export default Test;