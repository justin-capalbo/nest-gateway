import { Module } from "@nestjs/common";
import { GraphQLGatewayModule } from "@nestjs/graphql";
import { ServiceEndpointDefinition } from "@apollo/gateway";

const serviceList: ServiceEndpointDefinition[] = [
    { name: "user-service", url: "http://localhost:3000/user-service/graphql" },
    { name: "post-ervice", url: "http://localhost:4000/post-service/graphql" },
];

const USE_PLAYGROUND = true;

@Module({
    imports: [
        GraphQLGatewayModule.forRoot({
            server: {
                path: "/public",
                introspection: USE_PLAYGROUND,
                playground: USE_PLAYGROUND,
                formatError: (error: any) => {
                    const exception = error.extensions?.exception;
                    const response = exception?.response ?? { message: [error.message] };
                    const responseMessages = Array.isArray(response.message) ? response.message : [response.message];
                    const { message, ...restOfresponse } = response;
                    return {
                        info: {
                            ...restOfresponse,
                            messages: responseMessages,
                        },
                        message: error.message,
                        stackTrace: true,
                    };
                },
            },
            gateway: {
                serviceList,
            },
        })
    ]
})
export class AppModule {}
