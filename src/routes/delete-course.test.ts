import { test, expect } from "vitest"
import supertest from "supertest"
import { server } from "../app.ts"
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeAuthenticatedUser } from "../tests/factories/make-user.ts";

test("delete a course by id", async () => {

    await server.ready()

    const { token } = await makeAuthenticatedUser('manager')
    const course = await makeCourse()

    const response = await supertest(server.server).delete(`/courses/${course.id}`).set('Authorization', token)

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        deletedCourse: {
            id: expect.any(String),
            title: expect.any(String),
            description: null,
        },
    })
});

test("return 404 for trying delete a non existing courses", async () => {

    await server.ready()

    const response = await supertest(server.server).delete(`/courses/872b9e55-ee8a-46d4-b826-712c7a86959f`)

    expect(response.status).toEqual(404)
});