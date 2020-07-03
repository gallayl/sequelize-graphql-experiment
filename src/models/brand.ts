import { DataTypes, Model } from "sequelize";
import { defaultDb } from "../services/db";
import { Product } from "./product";
import { User } from "./user";

export class Brand extends Model {
  id!: number;
  name!: string;
  createdBy!: User;
  modifiedBy!: User;
  products!: Product[];
}

Brand.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    sequelize: defaultDb,
  }
);

Brand.belongsTo(User, { as: "createdBy" });
Brand.belongsTo(User, { as: "modifiedBy" });
