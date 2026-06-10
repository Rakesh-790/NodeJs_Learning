const { z } = require('zod');

const registerSchemaValid = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 charecters"),

    email: z.email("Invalid email format"),

    password: z.string()
        .min(8, "Password must be at least 8 charecters"),

    role: z.enum(['user', 'artist'])
        .optional()
});

const loginSchemaValid = z.object({
    identifier: z.string()
        .trim()
        .min(1, "Usernmae or email is required"),

    password: z.string()
        .min(8, "Passsword must be at least 8 charecters")
});

module.exports = { registerSchemaValid, loginSchemaValid };