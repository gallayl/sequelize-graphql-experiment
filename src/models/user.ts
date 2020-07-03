import { DataTypes, Model } from "sequelize";
import { defaultDb } from "../services/db";

export class User extends Model {
  public id!: number;
  public userName!: string;
  public firstName!: string;
  public lastName!: string;
  public lineManager?: User;
  public subordinates?: User[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      unique: true,
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: defaultDb,
  }
);

User.belongsTo(User, {
  as: "lineManager",
});
