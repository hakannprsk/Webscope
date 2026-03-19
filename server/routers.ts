import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  getAllCategories,
  getAllTools,
  getToolsByCategory,
  getToolBySlug,
  getUserFavorites,
  addUserFavorite,
  removeUserFavorite,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tools: router({
    categories: publicProcedure.query(async () => {
      return getAllCategories();
    }),
    list: publicProcedure.query(async () => {
      return getAllTools();
    }),
    byCategory: publicProcedure.input(z.number()).query(async (opts) => {
      return getToolsByCategory(opts.input);
    }),
    bySlug: publicProcedure.input(z.string()).query(async (opts) => {
      return getToolBySlug(opts.input);
    }),
  }),

  favorites: router({
    list: publicProcedure.query(async (opts) => {
      if (!opts.ctx.user) return [];
      return getUserFavorites(opts.ctx.user.id);
    }),
    add: publicProcedure.input(z.number()).mutation(async (opts) => {
      if (!opts.ctx.user) throw new Error("Not authenticated");
      await addUserFavorite(opts.ctx.user.id, opts.input);
      return { success: true };
    }),
    remove: publicProcedure.input(z.number()).mutation(async (opts) => {
      if (!opts.ctx.user) throw new Error("Not authenticated");
      await removeUserFavorite(opts.ctx.user.id, opts.input);
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
