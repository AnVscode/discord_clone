import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembesWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
