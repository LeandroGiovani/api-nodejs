import { test, expect } from "vitest"
import supertest from "supertest"
import { server } from "../app.ts"
import { faker } from "@faker-js/faker"
import { makeUser } from "../tests/factories/make-user.ts";

test("login", async () => {

    await server.ready()

    const { user, passwordBeforeHash } = await makeUser()

    const response = await supertest(server.server)
        .post("/sessions")
        .set("Content-Type", "application/json")
        .send({
            email: user.email,
            password: passwordBeforeHash,
        })
    
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        token: expect.any(String),
    })
});