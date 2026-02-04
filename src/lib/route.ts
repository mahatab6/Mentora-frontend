import { userServices } from "@/services/users.services";
import { NextResponse } from "next/server";


export async function GET() {
  const session = await userServices.getSession();

  return NextResponse.json({
    session,
  });
}
