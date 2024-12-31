import arcjet from "@arcjet/next";

// Create base Arcjet instance
export const aj = arcjet({
  key: process.env.ARCJET_API_KEY!,
  characteristics: ["ip.src"], // Track by IP
  rules: [],
});
