import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import z from "zod"
import { eq } from "drizzle-orm"

export const deleteCourseRoute: FastifyPluginAsyncZod = async (server) => {
    server.delete('/courses/:id', {
        schema: {
            tags: ['courses'],
            summary: 'Delete specific course.',
            params: z.object({
                id: z.uuid(),
            }),
            response: {
                200: z.object({
                    deletedCourse: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string().nullable(),
                    }),
                }),
                404: z.null().describe('Course not found.')
            }
        },
    }, async (request, reply) => {

        const courseId = request.params.id

        const result = await db.delete(courses).where(eq(courses.id, courseId)).returning()

        if (result.length > 0) {
            return { deletedCourse: result[0] }
        }

        return reply.status(404).send()

    })
}