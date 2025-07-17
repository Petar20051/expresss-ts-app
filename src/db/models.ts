import sequelize from './sequelize.js';
import companyModel from '../entities/company/company.model.js';
import userModel from '../entities/user/user.model.js';
import warehouseModel from '../entities/warehouse/warehouse.model.js';
import productModel from '../entities/product/product.model.js';
import partnerModel from '../entities/partner/partner.model.js';
import orderModel from '../entities/order/order.model.js';
import orderItemModel from '../entities/orderItem/orderItem.model.js';
import invoiceModel from '../entities/invoice/invoice.model.js';

const Company = companyModel(sequelize);
const User = userModel(sequelize);
const Warehouse = warehouseModel(sequelize);
const Product = productModel(sequelize);
const Partner = partnerModel(sequelize);
const Order = orderModel(sequelize);
const OrderItem = orderItemModel(sequelize);
const Invoice = invoiceModel(sequelize);

const models = {
	Company,
	User,
	Warehouse,
	Product,
	Partner,
	Order,
	OrderItem,
	Invoice,
};

Object.values(models).forEach((model) => {
	if ('associate' in model && typeof model.associate === 'function') {
		model.associate(models);
	}
});

export type Models = typeof models;
export default models;
