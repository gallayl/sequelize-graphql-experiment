import { Brand, Product, Team, User } from "../models";

export const seed = async (): Promise<void> => {
  await Promise.all([
    User.destroy({ where: {}, truncate: true }),
    Brand.destroy({ where: {}, truncate: true }),
    Product.destroy({ where: {}, truncate: true }),
    Team.destroy({ where: {}, truncate: true }),
  ]);

  const leadDev = new User(
    {
      userName: "leadDevKE",
      firstName: "lead",
      lastName: "Dev KE",
      lineManager: {
        userName: "iAmManagr",
        firstName: "Iam",
        lastName: "Manager",
      },
    },
    {
      include: [
        {
          model: User,
          as: "lineManager",
        },
      ],
    }
  );
  const savedLeadDev = await leadDev.save();
  await User.bulkCreate([
    { userName: "Architect Antal", lineManagerId: savedLeadDev.id },
    { userName: "FrontEnd Ferenc", lineManagerId: savedLeadDev.id },
    { userName: "BackendBéla", lineManagerId: savedLeadDev.id },
    { userName: "Designer Dániel", lineManagerId: savedLeadDev.id },
  ]);

  const [cola, pepsi] = await Brand.bulkCreate([
    { name: "Coca-cola" },
    { name: "Pepsi" },
  ]);

  await Product.bulkCreate([
    { name: "Coca-Cola Classic", brandId: cola.id },
    { name: "Coca-Cola Zero", brandId: cola.id },
    { name: "Pepsi Lime", brandId: pepsi.id },
    { name: "Pepsi Orange", brandId: pepsi.id },
  ]);
};
