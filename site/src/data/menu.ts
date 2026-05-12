export type MenuCategoryId =
  | "pies"
  | "pastries"
  | "cakes"
  | "drinks"
  | "cafe";

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  badge?: string;
};

export const menuCategories: {
  id: MenuCategoryId;
  label: string;
  items: MenuItem[];
}[] = [
  {
    id: "pies",
    label: "PIES",
    items: [
      { name: "Steak & Cheese", description: "Slow-cooked steak in rich gravy.", price: "$8.50" },
      { name: "Mince & Cheese", description: "Classic savoury mince, golden pastry.", price: "$7.90" },
      { name: "Chicken & Mushroom", description: "Creamy chicken with field mushrooms.", price: "$8.50" },
      {
        name: "Steak & Oyster",
        description: "Tender steak, plump oysters, buttery pastry.",
        price: "$9.90",
        badge: "NEW",
      },
      { name: "Butter Chicken", description: "Mild spiced curry, flaky lid.", price: "$8.50" },
      { name: "Potato Top", description: "Creamy potato mash over savoury filling.", price: "$8.20" },
    ],
  },
  {
    id: "pastries",
    label: "PASTRIES",
    items: [
      { name: "Croissant", description: "Buttery layers, baked till golden.", price: "$4.50" },
      { name: "Almond Croissant", description: "Frangipane, flaked almonds.", price: "$5.90" },
      { name: "Pain au Chocolat", description: "Dark chocolate batons.", price: "$5.50" },
      { name: "Sausage Roll", description: "Seasoned pork in crisp pastry.", price: "$5.20" },
      { name: "Spinach & Feta Roll", description: "Herbed spinach, creamy feta.", price: "$5.50" },
    ],
  },
  {
    id: "cakes",
    label: "CAKES & SLICES",
    items: [
      { name: "Caramel Slice", description: "Shortbread, caramel, chocolate.", price: "$5.50" },
      { name: "Lemon Tart", description: "Zesty curd, sweet pastry shell.", price: "$6.50" },
      { name: "Lamington", description: "Sponge, chocolate, coconut.", price: "$4.50" },
      { name: "Chocolate Brownie", description: "Dense, fudgy, baked daily.", price: "$5.20" },
      { name: "Cream Donut", description: "Soft bun, vanilla cream.", price: "$4.90" },
      { name: "Vanilla Slice", description: "Custard between crisp puff.", price: "$5.90" },
    ],
  },
  {
    id: "drinks",
    label: "DRINKS",
    items: [
      { name: "Flat White", description: "Double shot, silky microfoam.", price: "$5.00" },
      { name: "Long Black", description: "Hot water over espresso.", price: "$4.50" },
      { name: "Chai Latte", description: "Spiced chai, steamed milk.", price: "$5.50" },
      { name: "Hot Chocolate", description: "Real chocolate, whipped cream.", price: "$5.20" },
      { name: "Smoothies", description: "Seasonal fruit blend — ask us what’s on.", price: "$7.50" },
    ],
  },
  {
    id: "cafe",
    label: "CAFE",
    items: [
      { name: "Eggs on Toast", description: "Free-range eggs your way, sourdough.", price: "$12.90" },
      { name: "Avocado Smash", description: "Feta, cherry tomato, lime on grain.", price: "$14.50" },
      { name: "Bacon & Egg Panini", description: "House relish, melted cheese.", price: "$13.90" },
      { name: "Soup of the Day", description: "Served with a warm bread roll.", price: "$11.50" },
      { name: "House Salad", description: "Greens, seeds, lemon vinaigrette.", price: "$12.50" },
    ],
  },
];
