import { DataTypes, Model } from "sequelize";
import { defaultDb } from "../services/db";
import { Brand } from "./brand";

export class Product extends Model {
  id!: number;
  name!: string;
  brand!: Brand;
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
