import { NextResponse } from "next/server"

export async function GET() {
  try {
    // TODO: Implement transaction categories logic
    const categories = [
      { id: 1, name: "Food & Dining", icon: "utensils" },
      { id: 2, name: "Transportation", icon: "car" },
      { id: 3, name: "Shopping", icon: "shopping-bag" },
      { id: 4, name: "Entertainment", icon: "film" },
      { id: 5, name: "Bills & Utilities", icon: "receipt" },
      { id: 6, name: "Healthcare", icon: "heart" },
      { id: 7, name: "Education", icon: "book" },
      { id: 8, name: "Travel", icon: "plane" },
    ]
    
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}