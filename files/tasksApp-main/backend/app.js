import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { NotFoundError } from "./utils/errors.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

//Route imports
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Enable trust proxy - add this line before other middleware
app.set("trust proxy", 1);

// Security configuration
app.use(
  cors({
    origin: "*",
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          "'strict-dynamic'",
          "'nonce-rAnd0m123'",
          "'unsafe-inline'",
          "'unsafe-eval'",
        ],
        requireTrustedTypesFor: ["script"],
      },
    },
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api", limiter);

//Valid content types
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/user", userRoutes);

//Not found middleware
app.use("*", (req, res, next) => next(new NotFoundError(req.path)));

//Error middleware
app.use(errorHandler);

export default app;
