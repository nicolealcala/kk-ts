import { db } from "../db/index.js";
import {
  users,
  applications,
  applicationStatusHistory,
} from "../db/schema/index.js";
import {
  and,
  asc,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lte,
  or,
  sql,
  SQL,
} from "drizzle-orm";
import type {
  ApplicationListQuery,
  CreateApplicationData,
  UpdateApplicationData,
} from "../validation/application.validation.js";
import type { RequiredTextData } from "../validation/common.validation.js";
import { AppError } from "../lib/customErrors.js";

class ApplicationService {
  createOne(userId: RequiredTextData, data: CreateApplicationData) {
    return db.transaction(async (tx) => {
      const [newApplication] = await tx
        .insert(applications)
        .values({ ...data, userId })
        .returning();

      if (!newApplication) {
        throw new AppError("Failed to create application", 500);
      }

      await tx.insert(applicationStatusHistory).values({
        applicationId: newApplication.id,
        status: newApplication.status,
        notes: newApplication.notes,
      });

      return newApplication;
    });
  }

  createMany(userId: RequiredTextData, data: CreateApplicationData[]) {
    return db.transaction(async (tx) => {
      const newApplications = await tx
        .insert(applications)
        .values(data.map((d) => ({ ...d, userId })))
        .returning();

      if (newApplications.length === 0)
        throw new AppError("Failed to create bulk applications", 500);

      await tx.insert(applicationStatusHistory).values(
        newApplications.map((a) => ({
          applicationId: a.id,
          status: a.status,
          notes: a.notes,
        })),
      );
      return newApplications;
    });
  }

  async getAll(userId: RequiredTextData, query: ApplicationListQuery) {
    const { page, pageSize, sortOrder } = query;
    const conditions = [eq(applications.userId, userId)];

    const { sortColumn, offset } = this.constructConditions(conditions, query);

    const [data, filteredCount, totalCount] = await Promise.all([
      db
        .select()
        .from(applications)
        .where(and(...conditions))
        .orderBy(
          sortOrder === "asc" ? asc(sortColumn) : desc(sortColumn),
          sortOrder === "asc"
            ? asc(applications.createdAt)
            : desc(applications.createdAt),
        )
        .limit(pageSize)
        .offset(offset),
      db.$count(applications, and(...conditions)),
      db.$count(applications),
    ]);

    return {
      data,
      pagination: {
        page,
        pageSize,
        filteredCount: Number(filteredCount),
        totalCount,
        totalPages: Math.ceil(Number(filteredCount) / pageSize),
      },
    };
  }

  getById(userId: RequiredTextData, applicationId: RequiredTextData) {
    return db.query.applications.findFirst({
      where: { id: applicationId, userId },
      with: { statusHistory: true },
    });
  }

  updateById(
    userId: RequiredTextData,
    applicationId: RequiredTextData,
    data: UpdateApplicationData,
  ) {
    return db.transaction(async (tx) => {
      const [updatedApplication] = await tx
        .update(applications)
        .set(data)
        .where(
          and(
            eq(applications.id, applicationId),
            eq(applications.userId, userId),
          ),
        )
        .returning();

      if (!updatedApplication)
        throw new AppError("Failed to update application", 500);

      if (data.status)
        await tx.insert(applicationStatusHistory).values({
          applicationId: updatedApplication.id,
          status: data.status,
          notes: updatedApplication.notes,
        });

      return updatedApplication;
    });
  }

  deleteById(userId: RequiredTextData, applicationId: RequiredTextData) {
    return db
      .delete(applications)
      .where(
        and(
          eq(applications.id, applicationId),
          eq(applications.userId, userId),
        ),
      )
      .returning();
  }

  deleteManyById(userId: RequiredTextData, applicationIds: RequiredTextData[]) {
    return db
      .delete(applications)
      .where(
        and(
          inArray(applications.id, applicationIds),
          eq(applications.userId, userId),
        ),
      )
      .returning({ deletedId: applications.id });
  }

  private constructConditions(
    conditions: SQL<unknown>[],
    params: ApplicationListQuery,
  ) {
    const {
      page,
      pageSize,
      sortBy,
      search,
      workArrangement,
      status,
      appliedAtFrom,
      appliedAtTo,
    } = params;

    //Filters
    if (workArrangement)
      conditions.push(inArray(applications.workArrangement, workArrangement));
    if (status) conditions.push(inArray(applications.status, status));
    if (appliedAtFrom)
      conditions.push(gte(applications.appliedAt, appliedAtFrom));
    if (appliedAtTo) conditions.push(lte(applications.appliedAt, appliedAtTo));

    //Search
    if (search) {
      const searchPattern = `%${search}%`;
      conditions.push(
        or(
          ilike(applications.position, searchPattern),
          ilike(applications.company, searchPattern),
          sql`${applications.location}->>'countryCode' ILIKE ${searchPattern}`,
          sql`${applications.location}->>'state' ILIKE ${searchPattern}`,
          sql`${applications.location}->>'city' ILIKE ${searchPattern}`,
        )!,
      );
    }

    // Sort columns
    const sortColumns = {
      appliedAt: applications.appliedAt,
      position: applications.position,
      company: applications.company,
      workArrangement: applications.workArrangement,
      status: applications.status,
      location: sql`${applications.location}->>'countryCode'`,
      source: sql`${applications.source}->>'platform'`,
    };

    const sortColumn = sortColumns[sortBy];
    const offset = (page - 1) * pageSize;

    return { conditions, sortColumn, offset };
  }
}

export default ApplicationService;
