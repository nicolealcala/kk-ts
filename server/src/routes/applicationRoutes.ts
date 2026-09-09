import { Router } from "express";
import ApplicationService from "../services/application.service.js";
import {
  applicationListQuerySchema,
  createApplicationSchema,
  createManyApplicationsSchema,
  updateApplicationSchema,
} from "../validation/application.validation.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import {
  requiredTextArraySchema,
  resourceParamSchema,
} from "../validation/common.validation.js";
import { AppError } from "../lib/customErrors.js";

const applicationRouter = Router();
const applicationService = new ApplicationService();

export default function applicationRoutes(userId: string) {
  //TO DO: Replace userId with extracted userId from JWT
  applicationRouter.get(
    "/",
    validateRequest("query", applicationListQuerySchema),
    async (req, res) => {
      const query = applicationListQuerySchema.parse(req.query);

      const applications = await applicationService.getAll(userId, query);

      return res.json(applications);
    },
  );

  applicationRouter.get(
    "/:id",
    validateRequest("params", resourceParamSchema),
    async (req, res) => {
      const { id: applicationId } = resourceParamSchema.parse(req.params);

      const application = await applicationService.getById(
        userId,
        applicationId,
      );

      return res.json(application);
    },
  );

  applicationRouter.post(
    "/",
    validateRequest("body", createManyApplicationsSchema),
    async (req, res) => {
      const data = createManyApplicationsSchema.parse(req.body);
      const applications = await applicationService.createMany(userId, data);

      return res.status(201).json(applications);
    },
  );

  applicationRouter.patch(
    "/:id",
    validateRequest("body", updateApplicationSchema),
    async (req, res) => {
      const data = updateApplicationSchema.parse(req.body);
      const params = resourceParamSchema.parse(req.params);

      const updatedApplication = await applicationService.updateById(
        userId,
        params.id,
        data,
      );

      return res.json(updatedApplication);
    },
  );

  applicationRouter.post(
    "/delete",
    validateRequest("body", requiredTextArraySchema),
    async (req, res) => {
      const data = requiredTextArraySchema.parse(req.body);

      const deletedApplicationIds = await applicationService.delete(
        userId,
        data,
      );

      return res.json(deletedApplicationIds);
    },
  );

  return applicationRouter;
}
