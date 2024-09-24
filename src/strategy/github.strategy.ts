import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github";

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const options = {
            clientID: "0aedb874d88a172f568f",
            clientSecret: "8e6daf8dee574b571912cf2668cbbe90b7aa512f",
            callbackURL: "http://localhost:3000/auth/github/callback",
        }
        super(options);
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any,
    ): Promise<any> {
        done(null, profile);
    }
}