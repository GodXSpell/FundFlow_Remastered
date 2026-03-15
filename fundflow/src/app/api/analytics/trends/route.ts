import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "6months"
    
    // TODO: Calculate trends from database
    const trends = {
      period,
      income: [],
      expenses: [],
      netWorth: [],
      categories: []
    }
    return NextResponse.json(trends)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}