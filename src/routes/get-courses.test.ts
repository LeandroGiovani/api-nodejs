import { test, expect } from "vitest"
import supertest from "supertest"
import { server } from "../app.ts"
import { makeCourse } from "../tests/factories/make-course.ts";
import { randomUUID } from "node:crypto";

test("get a course by id", async () => {

    await server.ready()

    const titleId = randomUUID()

    const course = await makeCourse(titleId)

    const response = await supertest(server.server).get(`/courses?search=${titleId}`)

    expect(response.status).toEqual(200)
    console.log(response.body)
});