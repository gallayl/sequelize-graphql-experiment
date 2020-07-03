import { DataTypes, Model } from "sequelize";
import { defaultDb } from "../services/db";
import { Brand } from "./brand";
import { User } from "./user";

export class Product extends Model {
  id!: number;
  name!: string;
  brand!: Brand;
  createdBy!: User;
  modifiedBy!: User;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: defaultDb,
  }
);

Product.belongsTo(Brand, {
  as: "brand",
});

Product.belongsTo(User, { as: "createdBy" });
Product.belongsTo(User, { as: "modifiedBy" });
