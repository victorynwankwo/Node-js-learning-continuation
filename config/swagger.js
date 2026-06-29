const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 3500;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Continuation API",
      version: "1.0.0",
      description:
        "Swagger documentation for the authentication, refresh, logout, and employee management routes.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Local development server",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description:
          "User registration, login, token refresh, and session logout",
      },
      {
        name: "Employees",
        description: "Employee CRUD operations",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        LoginRequest: {
          type: "object",
          required: ["user", "pwd"],
          properties: {
            user: {
              type: "string",
              example: "jane",
            },
            pwd: {
              type: "string",
              example: "secret123",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            accessToken: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            },
            success: {
              type: "string",
              example: "User jane is logged in!",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["username", "password", "roles"],
          properties: {
            username: {
              type: "string",
              example: "jane",
            },
            password: {
              type: "string",
              example: "secret123",
            },
            roles: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["Employee"],
            },
          },
        },
        Employee: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "64c8b0c1d4ef4f6182793f11",
            },
            firstname: {
              type: "string",
              example: "Jane",
            },
            lastname: {
              type: "string",
              example: "Doe",
            },
            age: {
              type: "integer",
              example: 28,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Unauthorized",
            },
          },
        },
      },
    },
    paths: {
      "/register": {
        post: {
          tags: ["Authentication"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
            },
            400: {
              description: "Invalid request payload",
            },
          },
        },
      },
      "/auth": {
        post: {
          tags: ["Authentication"],
          summary: "Authenticate a user and issue an access token",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AuthResponse",
                  },
                },
              },
            },
            401: {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ErrorResponse",
                  },
                },
              },
            },
          },
        },
      },
      "/refresh": {
        get: {
          tags: ["Authentication"],
          summary: "Refresh the user access token",
          description: "Uses the refresh token stored in the HTTP-only cookie.",
          responses: {
            200: {
              description: "Token refreshed successfully",
            },
            401: {
              description: "Refresh token expired or invalid",
            },
          },
        },
      },
      "/logout": {
        get: {
          tags: ["Authentication"],
          summary: "Log out the current user",
          description: "Clears the refresh token cookie and ends the session.",
          responses: {
            200: {
              description: "Logged out successfully",
            },
          },
        },
      },
      "/employees": {
        get: {
          tags: ["Employees"],
          summary: "Get all employees",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Employee list returned",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Employee",
                    },
                  },
                },
              },
            },
            401: {
              description: "Missing or invalid token",
            },
          },
        },
        post: {
          tags: ["Employees"],
          summary: "Create a new employee",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Employee",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Employee created",
            },
            401: {
              description: "Missing or invalid token",
            },
          },
        },
        put: {
          tags: ["Employees"],
          summary: "Update an employee",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Employee updated",
            },
            401: {
              description: "Missing or invalid token",
            },
          },
        },
        delete: {
          tags: ["Employees"],
          summary: "Delete an employee",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Employee deleted",
            },
            401: {
              description: "Missing or invalid token",
            },
          },
        },
      },
      "/employees/{id}": {
        get: {
          tags: ["Employees"],
          summary: "Get a single employee by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "Employee ID",
            },
          ],
          responses: {
            200: {
              description: "Employee found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Employee",
                  },
                },
              },
            },
            404: {
              description: "Employee not found",
            },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerSpec,
  swaggerUi,
};
