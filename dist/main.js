"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Budget Tracker API')
        .setDescription('Complete Financial Management System - Track expenses, budgets, goals, and group finances')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .addTag('auth', 'Authentication endpoints')
        .addTag('users', 'User management')
        .addTag('accounts', 'Financial accounts')
        .addTag('transactions', 'Income and expense tracking')
        .addTag('budgets', 'Budget management')
        .addTag('goals', 'Financial goals')
        .addTag('reports', 'Analytics and reporting')
        .addTag('notifications', 'Alerts and reminders')
        .addTag('groups', 'Shared expense management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
        ignoreGlobalPrefix: false,
        deepScanRoutes: true,
    });
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Budget Tracker API',
        customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .information-container { background: #f5f5f5; padding: 20px; }
      .swagger-ui .try-out { display: block !important; }
    `,
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        ],
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
            tryItOutEnabled: true,
        },
    });
    await app.listen(3000);
    console.log('🚀 Application is running on: http://localhost:3000');
    console.log('📚 Swagger documentation at: http://localhost:3000/api');
    console.log('💡 Click "Try it out" on any endpoint to test!');
}
bootstrap();
//# sourceMappingURL=main.js.map