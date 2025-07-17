import {Express} from 'express';
import companyRoutes from '../entities/company/company.routes.js';
import invoiceRoutes from '../entities/invoice/invoice.routes.js';
import orderRoutes from '../entities/order/order.routes.js';
import orderItemRoutes from '../entities/orderItem/orderItem.routes.js';
import partnerRoutes from '../entities/partner/partner.routes.js';
import productRoutes from '../entities/product/product.routes.js';
import userRoutes from '../entities/user/user.routes.js';
import warehouseRoutes from '../entities/warehouse/warehouse.routes.js';

export function loadRoutes(app: Express) {
	app.use('/api/companies', companyRoutes);
	app.use('/api/invoices', invoiceRoutes);
	app.use('/api/order-items', orderItemRoutes);
	app.use('/api/orders', orderRoutes);
	app.use('/api/partners', partnerRoutes);
	app.use('/api/products', productRoutes);
	app.use('/api/users', userRoutes);
	app.use('/api/warehouses', warehouseRoutes);
}
