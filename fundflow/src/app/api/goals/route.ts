import { NextResponse } from "next/server"

export async function GET() {
  try {
    // TODO: Fetch goals from database
    const goals: any[] = []
    return NextResponse.json({ data: goals })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const goal = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      progress: 0
    }
    return NextResponse.json(goal, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}