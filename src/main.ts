import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";
import { ValidationPipe, Logger } from "@nestjs/common";

async function main() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    const port = 5000;
    await app.listen(port, () => Logger.log(`Started on http://localhost:${port}/public`, "NestApplication"));
}
main();
