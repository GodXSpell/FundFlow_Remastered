import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const categories = searchParams.get("categories")?.split(",")
    
    // TODO: Generate CSV export from database
    const csvData = "Date,Amount,Category,Description\n"
    
    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=transactions.csv"
      }
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}