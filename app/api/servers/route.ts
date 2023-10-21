import { v4 } from "uuid";
import { NextResponse } from "next/server";

import { MemberRole } from "@prisma/client";
import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await CurrentProfile();

    if (!profile) return new NextResponse("unauthorized", { status: 401 });

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: v4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },

        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    throw error;
    return new NextResponse("internal server error", { status: 500 });
  }
}
