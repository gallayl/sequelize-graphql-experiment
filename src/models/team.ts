import { DataTypes, Model } from "sequelize";
import { defaultDb } from "../services/db";
import { User } from "./user";

export class Team extends Model {
  public id!: number;
  public name!: string;
  public manager!: User;
  public members!: User[];
}

Team.init(
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

// Team.belongsTo(User, {
//   as: "manager",
// });

// Team.hasMany(User, {
//   as: "members",
// });
