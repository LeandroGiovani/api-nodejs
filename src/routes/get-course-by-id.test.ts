import { test, expect } from "vitest"
import supertest from "supertest"
import { server } from "../app.ts"
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test("get a course by id", async () => {

    await server.ready()

    const { token } = await makeAuthenticatedUser('student')
    const course = await makeCourse()

    const response = await supertest(server.server).get(`/courses/${course.id}`).set('Authorization', token)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: null,
        },
    })
});

test("return 404 for non existing courses", async () => {

    await server.ready()

    const { token } = await makeAuthenticatedUser('student')

    const response = await supertest(server.server).get(`/courses/872b9e55-ee8a-46d4-b826-712c7a86959f`).set('Authorization', token)

    expect(response.status).toEqual(404)
});